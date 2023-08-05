import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { APIService } from "../../common/api.service";
import { IAnswer } from 'src/model/dto/answer.interface';
import { Admin } from "../../model/orm/admin.entity";
import { Setting } from "src/model/orm/setting.entity";
import { Lang } from "src/model/orm/lang.entity";
import { Wordbook } from "src/model/orm/wordbook.entity";
import { Mailtemplate } from "src/model/orm/mailtemplate.entity";
import { Currency } from "src/model/orm/currency.entity";
import { EmployeeStatus } from "src/model/orm/employee.status.entity";
import { EmployeeStatusTranslation } from "src/model/orm/employee.status.translation.entity";
import { Restaurant } from "src/model/orm/restaurant.entity";
import { Employee } from "src/model/orm/employee.entity";
import { Hall } from "src/model/orm/hall.entity";
import { Icon } from "src/model/orm/icon.entity";
import { IconTranslation } from "src/model/orm/icon.translation.entity";
import { Cat } from "src/model/orm/cat.entity";
import { IUpdateParam } from "src/model/dto/updateparam.interface";
import { Product } from "src/model/orm/product.entity";
import { Serving } from "src/model/orm/serving.entity";
import { ServingTranslation } from "src/model/orm/serving.translation.entity";
import { WSServer } from "src/model/orm/wsserver.entity";
import {RoomType} from "../../model/orm/room.type.entity";
import {RoomTypeTranslation} from "../../model/orm/room.type.translation.entity";
import {FacilityTypeTranslation} from "../../model/orm/facility.type.translation.entity";
import {FacilityType} from "../../model/orm/facility.type.entity";
import {Room} from "../../model/orm/room.entity";
import {Floor} from "../../model/orm/floor.entity";
import {Unit} from "../../model/orm/unit.entity";
import {UnitTranslation} from "../../model/orm/unit.translation.entity";
import {IngredientType} from "../../model/orm/ingredient.type.entity";

@Injectable()
export class ObjectsService extends APIService {
    constructor (
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(Setting) private settingRepository: Repository<Setting>,
        @InjectRepository(Lang) private langRepository: Repository<Lang>,
        @InjectRepository(Wordbook) private wordbookRepository: Repository<Wordbook>,
        @InjectRepository(Mailtemplate) private mailtemplateRepository: Repository<Mailtemplate>,        
        @InjectRepository(Currency) private currencyRepository: Repository<Currency>,        
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,        
        @InjectRepository(EmployeeStatus) private employeeStatusRepository: Repository<EmployeeStatus>,        
        @InjectRepository(EmployeeStatusTranslation) private employeeStatusTranslationRepository: Repository<EmployeeStatusTranslation>,
        @InjectRepository(RoomType) private roomTypeRepository: Repository<RoomType>,
        @InjectRepository(RoomTypeTranslation) private roomTypeTranslationRepository: Repository<RoomTypeTranslation>,
        @InjectRepository(FacilityType) private facilityTypeRepository: Repository<FacilityType>,
        @InjectRepository(FacilityTypeTranslation) private facilityTypeTranslationRepository: Repository<FacilityTypeTranslation>,
        @InjectRepository(Floor) private floorRepository: Repository<Floor>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,        
        @InjectRepository(Hall) private hallRepository: Repository<Hall>,        
        @InjectRepository(Icon) private iconRepository: Repository<Icon>,        
        @InjectRepository(IconTranslation) private iconTranslationRepository: Repository<IconTranslation>,        
        @InjectRepository(Cat) private catRepository: Repository<Cat>,        
        @InjectRepository(Product) private productRepository: Repository<Product>,     
        @InjectRepository(Serving) private servingRepository: Repository<Serving>,        
        @InjectRepository(ServingTranslation) private servingTranslationRepository: Repository<ServingTranslation>,          
        @InjectRepository(WSServer) private wsserverRepository: Repository<WSServer>,          
        @InjectRepository(Unit) private unitRepository: Repository<Unit>,
        @InjectRepository(UnitTranslation) private unitTranslationRepository: Repository<UnitTranslation>,
        @InjectRepository(IngredientType) private ingredientTypeRepository: Repository<IngredientType>,
    ) {
        super();
    }

    public async updateParam (dto: IUpdateParam): Promise<IAnswer<void>> {        
        try {                                    
            await this[`${dto.obj}Repository`].update(dto.id, {[dto.p]: dto.v});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ObjectsService.updateparam: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }

    public async updateEgoisticParam (dto: IUpdateParam): Promise<IAnswer<void>> {        
        try {
            if (dto.v) { // if param is true, first set all to false, because it is egoistic! :-)                                
                this[`${dto.obj}Repository`].update({}, {[dto.p]: false});
            }
            
            await this[`${dto.obj}Repository`].update(dto.id, {[dto.p]: dto.v});
            return {statusCode: 200};
        } catch (err) {
            let errTxt: string = `Error in ObjectsService.updateEgoisticParam: ${String(err)}`;
            console.log(errTxt);
            return {statusCode: 500, error: errTxt};
        }
    }    
}
