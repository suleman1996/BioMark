function cmToFeet(n) {
  var realFeet = (n * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = (realFeet - feet) * 12;
  return feet + "'" + inches.toFixed(1);
}

const feetToCm = (feets: string) => {
  const [feet, inches] = feets.toString().split("'");
  let cmTotal = 0;
  if (feet) {
    cmTotal += feet * 30.48;
  }
  if (inches) {
    cmTotal += inches * 2.54;
  }
  return cmTotal.toFixed(1).toString();
};

const kgToLbs = () => {
  Number((prev.weight * 2.205).toFixed(1));
};

const lbsToKg = () => {
  Number((prev.weight * (1 / 2.205)).toFixed(1));
};

const mgMmolConversion = (value: number, toUnit: 'mg/dL' | 'mmol/L' | string) =>
  toUnit == 'mg/dL' ? value * 18 : value * (1 / 18); // These values might not be accurate

const measurmentValidator = (is_metric, measurment, value) => {
  let errorr = '';
  if (value.length === 0)
    return measurment === 'height'
      ? 'Please provide your height measurement'
      : 'Please provide your weight measurement';
  const WEIGHT_RANGE = {
    kg: {
      min: 0,
      max: 200,
      errorr: 'Please enter a valid weight between 0 - 440 lbs',
    },
    lbs: {
      min: 0,
      max: 440,
      errorr: 'Please enter a valid weight between 0 - 200 kg',
    },
  };

  const Height_RANGE = {
    cm: {
      min: 60,
      max: 250,
      errorr: 'Please enter a valid height between 60 - 250 cm',
    },
    ft: {
      min: "1'11.7",
      max: "8'2.5",
      errorr: "Please enter a valid height between 1'11.7 - 8'2.5 ft/in",
    },
  };

  if (is_metric) {
    // KG
    if (measurment === 'weight') {
      errorr =
        WEIGHT_RANGE.kg.min < value && value <= WEIGHT_RANGE.kg.max
          ? ''
          : WEIGHT_RANGE.kg.errorr;
    } else if (measurment === 'height') {
      //CM
      console.log('From CM', value, typeof value);
      errorr =
        Height_RANGE.cm.min < value && value <= Height_RANGE.cm.max
          ? ''
          : Height_RANGE.cm.errorr;
    }
  } else {
    // LBS
    if (measurment === 'weight') {
      errorr =
        WEIGHT_RANGE.lbs.min < value <= WEIGHT_RANGE.lbs.max
          ? ''
          : WEIGHT_RANGE.lbs.errorr;
    } else if (measurment === 'height') {
      //Feet
      errorr =
        Height_RANGE.cm.min < feetToCm(value) &&
        feetToCm(value) <= Height_RANGE.cm.max
          ? ''
          : Height_RANGE.ft.errorr;
    }
  }

  return errorr;
};

const bloodSugarValidator = (
  values: { fromfpg: number; tofpg: number; fromppg: number; toppg: number },
  unit: 'mg/dL' | 'mmol/L' | string
) => {
  const errors = {
    fromfpg: '',
    tofpg: '',
    fromppg: '',
    toppg: '',
  };
  console.log({ values });
  if (values.tofpg <= values.fromfpg) {
    errors.tofpg = 'Please enter a reading higher than from';
  }
  if (values.toppg <= values.fromppg) {
    errors.toppg = 'Please enter a reading higher than from';
  }
  if (
    !(values.fromfpg >= limits[unit][0] && values.fromfpg <= limits[unit][1])
  ) {
    errors.fromfpg = `Please input a valid target between ${limits[unit][0]}-${limits[unit][1]} ${unit}`;
  }
  if (!(values.tofpg >= limits[unit][0] && values.tofpg <= limits[unit][1])) {
    errors.tofpg = `Please input a valid target between ${limits[unit][0]}-${limits[unit][1]} ${unit}`;
  }
  if (
    !(values.fromppg >= limits[unit][0] && values.fromppg <= limits[unit][1])
  ) {
    errors.fromppg = `Please input a valid target between ${limits[unit][0]}-${limits[unit][1]} ${unit}`;
  }
  if (!(values.toppg >= limits[unit][0] && values.toppg <= limits[unit][1])) {
    errors.toppg = `Please input a valid target between ${limits[unit][0]}-${limits[unit][1]} ${unit}`;
  }

  return errors;
};
const hba1cValidator = (goal: number, unit: '%' | string) => {
  const errors = {
    goal: '',
  };
  if (!(goal >= limits[unit][0] && goal <= limits[unit][1])) {
    errors.goal = `Please input a valid target between ${limits[unit][0]}-${limits[unit][1]} ${unit}`;
  }
  return errors;
};

export {
  cmToFeet,
  feetToCm,
  kgToLbs,
  lbsToKg,
  measurmentValidator,
  mgMmolConversion,
  bloodSugarValidator,
  hba1cValidator,
};

const limits = {
  'mg/dL': [1, 900],
  'mmol/L': [0.06, 50],
  '%': [5, 15],
};
