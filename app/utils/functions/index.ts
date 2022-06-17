export const roundToDecimalPlaces = (
  value: number | string,
  decimalPlaces: number = 1
) => {
  const precision = Math.pow(10, decimalPlaces);

  return String(Math.round(+value * precision) / precision);
};
