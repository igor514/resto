export function sanitizeFee(value: number): number {
  if (!Number.isNaN(value)) {
    if (value < 0) {
      value = 0;
    }
    return +value.toFixed(2);
  } else {
    return null;
  }
}
