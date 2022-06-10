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

const measurementValidator = (is_metric, measurment, value) => {
  let errorr = '';
  if (value.length === 0 || value == 0)
    return measurment === 'height'
      ? 'Please provide your height measurement'
      : 'Please provide your weight measurement';
  const WEIGHT_RANGE = {
    kg: {
      min: 0,
      max: 200,
      errorr: 'Please enter a valid weight between 0 - 200 kg',
    },
    lbs: {
      min: 0,
      max: 440,
      errorr: 'Please enter a valid weight between 0 - 440 lbs',
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
      console.log(
        WEIGHT_RANGE.lbs.min,
        value,
        WEIGHT_RANGE.lbs.max,
        '-=------>',
        WEIGHT_RANGE.lbs.min < Number(value) <= WEIGHT_RANGE.lbs.max
      );
      errorr =
        WEIGHT_RANGE.lbs.min < value && value <= WEIGHT_RANGE.lbs.max
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

const bloodPressureValidator = (measurment, value) => {
  let errorr = '';
  if (value.length === 0 || value == 0)
    return measurment === 'bp_systolic'
      ? 'Please input a systolic BP'
      : 'Please input a diastolic BP';
  const BP_RANGE = {
    sys: {
      min: 60,
      max: 200,
      errorr: 'Please input a valid systolic BP from 60-200 mmHg',
    },
    dia: {
      min: 30,
      max: 120,
      errorr: 'Please input a valid diastolic BP from 30-120 mmHg',
    },
  };
  if (measurment === 'bp_systolic') {
    errorr =
      BP_RANGE.sys.min < value && value <= BP_RANGE.sys.max
        ? ''
        : BP_RANGE.sys.errorr;
  } else {
    errorr =
      BP_RANGE.dia.min < value && value <= BP_RANGE.dia.max
        ? ''
        : BP_RANGE.dia.errorr;
  }

  return errorr;
};

const hba1cValidator = (goal: number, unit: '%') => {
  const errors = {
    goal: '',
  };
  if (!(goal >= LIMITS[unit][0] && goal <= LIMITS[unit][1])) {
    errors.goal = `Please input a valid target between ${LIMITS[unit][0]}-${LIMITS[unit][1]} ${unit}`;
  }
  return errors;
};

const bloodSugarValidator = (
  unit: 'mg/dL' | 'mmol/L',
  value: string | number,
  type: string = 'measurement'
) => {
  const val = Number(value);
  if (!val) return 'Please input a valid measurement';
  return LIMITS[unit][0] < val && val <= LIMITS[unit][1]
    ? ''
    : `Please input a valid ${type} between ${LIMITS[unit][0]}-${LIMITS[unit][1]} ${unit}`;
};

export {
  cmToFeet,
  feetToCm,
  kgToLbs,
  lbsToKg,
  mgMmolConversion,
  bloodSugarValidator,
  hba1cValidator,
  measurementValidator,
  bloodPressureValidator,
};

//Value on the left side is min and the right side is max
const LIMITS = {
  'mg/dL': [1, 900],
  'mmol/L': [0.06, 50],
  '%': [5, 15],
};
