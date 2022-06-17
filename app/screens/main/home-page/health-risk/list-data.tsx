import BMI from 'assets/svgs/Bmi';
import Smoking from 'assets/svgs/smoking';
import Drinking from 'assets/svgs/Drinking';
import Stress from 'assets/svgs/stress';
import Sleep from 'assets/svgs/sleep';
import Heart from 'assets/svgs/heart';
import BP from 'assets/svgs/bP';
import Diabetes from 'assets/svgs/diabtes';

const Diabetess = [
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Age',
    text: 'Your risk increases above the age of 40.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Gender',
    text: 'Men are more likely to have type 2 diabetes compared to women.',
  },
  {
    image: require('../../../../assets/images/home/GD.png'),
    title: 'Gestational Diabetes',
    text: 'Women who had gestational diabetes are at an increased risk.',
  },
  {
    image: require('../../../../assets/images/home/Familyhod.png'),
    title: 'Fmaily History of Diabetes',
    text: 'A family history of diabetes may increases your risk.',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'High Blood Pressure',
    text: 'Having high blood pressure increases your risk.',
  },
  {
    image: require('../../../../assets/images/home/Exercise.png'),
    title: 'Exercise',
    text: 'Being physically inactive increases your risk.',
  },
  {
    image: require('../../../../assets/images/home/Height.png'),
    title: 'Height',
    text: 'Your height is used to calculate Body Mass Index (BMI).High BMIs increases your risk.',
  },
  {
    image: require('../../../../assets/images/home/Weight.png'),
    title: 'Weight',
    text: 'Your weight is used to calculate Body Mass Index (BMI).High BMIs increases your risk.',
  },
];

const HEART_DISEASE = [
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Age',
    text: 'Your risk increases above the age of 35.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Gender',
    text: 'Men have a higher risk than women.',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'HDL Cholesterol',
    text: 'Your risk is increased with a lower HDL cholesterol.',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'Total Cholesterol',
    text: 'Your risk is increased with a higher total cholesterol.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Systolic Blood Pressure',
    text: 'Your risk is increased with a higher systolic (upper) blood pressure reading.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Blood Pressure Medication',
    text: 'If you are currently taking blood pressure medication, it means you that you are already diagnosed with high blood pressure (hypertension). This puts you at a higher risk.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Smoking',
    text: 'Being a smoker significantly increases your risk.',
  },
  {
    image: require('../../../../assets/images/home/GD.png'),
    title: 'Diabetes',
    text: 'If you have been diagnosed with diabetes, you are at a higher risk.',
  },
];

const Blood_Presure = [
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'Low',
    text: '<90 / <60 mmHg',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'Normal',
    text: '<120 / <80 mmHg',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'Elevated',
    text: '120-129 / <80 mmHg',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'High (HPT Stage 1)',
    text: '130-139 / 80-89 mmHg',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'High (HPT Stage 2)',
    text: '140-179 / 90-119 mmHg',
  },
  {
    image: require('../../../../assets/images/home/HighBloodPressure.png'),
    title: 'Hypertensive Crisis',
    text: '>180 / >120 mmHg\n(Consult your doctor immediately)',
  },
];

const BMII = [
  {
    image: require('../../../../assets/images/home/Weight.png'),
    title: 'Underweight',
    text: '<18.50 kg/m',
  },
  {
    image: require('../../../../assets/images/home/Weight.png'),
    title: 'Normal',
    text: '18.50 - 22.99 kg/m',
  },
  {
    image: require('../../../../assets/images/home/Weight.png'),
    title: 'Overweight',
    text: '23.00 - 27.49 kg/m',
  },
  {
    image: require('../../../../assets/images/home/Weight.png'),
    title: 'Obese',
    text: '>30 kg/m',
  },
];
const Drinkings = [
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Pint of Beer',
    text: 'One pint of beer (ABV 3.6%) is equivalent to 2 units.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Glass of Wine',
    text: 'One glass of wine (ABV 12%) is equivalent to 2.1 units.',
  },
  {
    image: require('../../../../assets/images/home/people.png'),
    title: 'Shot of Spirit',
    text: 'Single small shot of spirits (25ml, ABV 40%) is equivalent to 1 unit.',
  },
];

const HEART_DISEASE_REF = {
  text: 'Management of Dyslipidaemia 2017 (5th Edition) Clinical Practice Guidelines, Ministry of Health Malaysia.',
};
const HEART_DISEASE_FOOTNOTE = {
  text: 'Your heart risk score is only an estimate. Additionally, your risk changes over time. Please discuss with your doctor for more information',
};

const Diabetes_ref = {
  text: 'American Diabetes Association',
};
const Diabetes_footnotes = {
  text: 'Your diabetes risk score is only an estimate. Additionally, your risk changes over time. Only a blood test can determine a diagnosis. Please discuss with your doctor for more information.',
};

const Blood_Pressure_ref = {
  text: 'Management of Hypertension (4th Edition) Clinical Practice Guidelines, Ministry of Health Malaysia',
};
const BMI_REF = {
  text: '1. World Health Organisation (International Association For The Study of Obesity)\n\n2. Management of Type 2 Diabetes Mellitus (5th Edition) Clinical Practice Guidelines, Ministry of Health Malaysia',
};
const Smoking_ref = {
  text: 'American Cancer Society',
};
const Drinking_ref = {
  text: 'www.drinkaware.co.uk',
};
const Stress_ref = {
  text: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5791241/',
};
const Sleeping_ref = {
  text: 'National Sleep Foundation, USA https://sleepshow.org/how-much-sleep/',
};

const HEART_DISEASE_CALC = {
  text: 'This heart risk calculation is validated by the Framingham Heart Study for people between ages of 30 and 74 and without prior history of heart disease. \n\nThe calculation takes the following factors into account:',
};
const diabetes_Calc = {
  text: 'This diabetes risk score is based on the Type 2 Diabetes Risk Test by the American Diabetes Association for people who have no prior history of diabetes or prediabetes. \nIt takes the following factors into account:',
};
const Blood_Pressure_Calc = {
  text: 'Your blood pressure measures the pressure of the blood that is flowing in your blood vessels.\n\nThe top number is your systolic reading which measures the pressure when your heart beats.\n\nThe bottom number is your diastolic reading which measure the pressure when your hear relaxes in between beats.\n\nHypertension is defined as persistent elevation of systolic blood pressure (BP) of 130 mmHg or greater and/or diastolic BP of 90 mmHg or greater, taken at least twice on two separate occasions.\n\nIf your systolic and diastolic values are in different categories, we take the higher of the two classifications. For example, if your systolic is normal but your diastolic is elevated, then your blood pressure will be classified as elevated.\n\nThe following are the different classifications:',
};
const BMI_CALC = {
  text: 'Your Body Mass Index (BMI) is a method of estimating the amount of body fat based on your height and weight.\n\nBMI is calculated by dividing your weight (kg) by the square of your height (m<sup>2</sup>).\n\nBMI often miscategorises bodybuilders as overweight due to their abundance of muscle mass. Therefore it should not be used for this group of individuals.\n\nThe following are the different classifications:',
};
const Smoking_Calc = {
  text: 'Pack-years is a way to measure smoking intensity. It takes into account how much and how long you have smoked.\n\nIt is calculated by dividing the number of cigarettes smoked in a day by 20 and then multiplying it by the number of years smoked.',
};
const Drinking_Calc = {
  text: 'Measuring alcohol units is a useful way to check whether your alcohol intake is above or within recommended limits.\n\nThis calculation uses alcohol units which depend on the alcohol by volume (ABV) % and the size of the drink.\n\nYour alcohol status is an estimate as it is difficult to ensure reliability of alcohol units. This is due to the variety of different strengths and drink sizes of alcohol beverages that are available.',
};
const Sleeping_Calc = {
  text: 'Good sleep hygiene can help you get good night time sleep.\n\nSome of sleep hygiene checklist includes establishing bedtime routine which is going to bed and waking in the morning, at the same time every day. Limiting screen time before going to bed, and avoiding stimulants (caffeine, nicotine, alcohol) as bedtime approaches will help to speed the onset of sleep. Otherwise, keeping your bedroom dark and cool will help you sleep throughout the night without waking up. \n\nThis sleep requirement is recommended by the National Sleep Foundation(USA).',
};
const Stress_Calc = {
  text: 'Perceived Stress Scale are among the most widely used tools to measure perceived stress. This particular questionaire uses the PSS-4 framework.',
};

export const healthRiskData = {
  heart: {
    icon: Heart,
    calculations: HEART_DISEASE_CALC,
    disease: HEART_DISEASE,
    footnotes: HEART_DISEASE_FOOTNOTE,
    refrence: HEART_DISEASE_REF,
  },
  bmi: {
    icon: BMI,
    calculations: BMI_CALC,
    disease: BMII,
    refrence: BMI_REF,
  },
  bp: {
    icon: BP,
    calculations: Blood_Pressure_Calc,
    disease: Blood_Presure,
    refrence: Blood_Pressure_ref,
  },
  diabetes: {
    icon: Diabetes,
    calculations: diabetes_Calc,
    disease: Diabetess,
    footnotes: Diabetes_footnotes,
    refrence: Diabetes_ref,
  },
  drinking: {
    icon: Drinking,
    calculations: Drinking_Calc,
    disease: Drinkings,
    refrence: Drinking_ref,
  },
  sleeping: {
    icon: Sleep,
    calculations: Sleeping_Calc,
    refrence: Sleeping_ref,
  },
  smoking: {
    icon: Smoking,
    calculations: Smoking_Calc,
    refrence: Smoking_ref,
  },
  stress: {
    icon: Stress,
    calculations: Stress_Calc,
    refrence: Stress_ref,
  },
};
