import {Product} from "../model/orm/product.model";
import {Ingredient} from "../model/orm/ingredient.model";

export const getProductPrice = (product: Product): number => {
  let price = 0;
  for (const ingredient of product.ingredients) {
    price += getIngredientPrice(ingredient)
  }
  return price
}

export const getIngredientPrice = (ig: Ingredient): number => {
  if (!ig.type_id || !ig.unit_id || !ig.unit || !ig.type) {
    return 0 // no type or measurement unit
  } else if (!ig.type.price) {
    return 0 // no price
  } else if (isNaN(ig.amount) || ig.amount < 0) {
    return 0 // incorrect quantity
  }

  // inverted conversion (ex: type unit is grams, ingredient selected unit is kg)
  if (!ig.unit.related_id && ig.unit.id === ig.type.unit.related_id) {
    return (ig.amount / ig.type.unit.conversion_ratio) * ig.type.price
  }

  if (!ig.unit.related_id) { // not related to another unit
    return ig.amount * ig.type.price
  } else if (ig.unit.related_id) {
    // assume kg is base and both g and mg relate to it
    if (ig.unit_id === ig.type.unit_id) {
      // selected unit and type unit match conversion is not needed
      return ig.amount * ig.type.price
    } else if (ig.unit.related_id === ig.type.unit.id) { // parent & child
      // convert unit to base unit
      // ex: g -> kg
      const quantity_base = ig.unit.conversion_ratio * ig.amount
      return quantity_base * ig.type.price
    } else if (ig.unit.related_id === ig.type.unit.related_id) { // two child units with same parent
      // convert unit to base unit and again to another related unit
      // g -> kg -> mg
      const quantity_base = ig.unit.conversion_ratio * ig.amount
      const quantity_related = quantity_base / ig.type.unit.conversion_ratio
      return quantity_related * ig.type.price
    }
  }
  return 0 // better to show wrong number than cause errors
}
