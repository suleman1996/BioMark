export const healthRisksColor = (colors, status) => {
  if (status == 'Obese') {
    return colors.Obese;
  } else if (status == 'High') {
    return colors.High;
  } else if (status == 'none') {
    return colors.none;
  } else if (status == 'normal') {
    return colors.normal;
  } else if (status == 'high') {
    return colors.high;
  } else if (status == 'bad') {
    return colors.bad;
  } else {
    return colors.none;
  }
};
