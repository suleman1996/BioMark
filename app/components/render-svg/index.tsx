import React from 'react';

import Heart from 'assets/svgs/heart';
import Diabetes from 'assets/svgs/diabtes';
import BP from 'assets/svgs/bP';
import BMI from 'assets/svgs/Bmi';
import Smoking from 'assets/svgs/smoking';
import Drinking from 'assets/svgs/Drinking';
import Stress from 'assets/svgs/stress';
import Sleep from 'assets/svgs/sleep';

const RenderSvg = ({ id, color }) => {
  if (id == 0) {
    return <Heart fill={color} />;
  } else if (id == 1) {
    return <Diabetes fill={color} />;
  } else if (id == 2) {
    return <BP fill={color} />;
  } else if (id == 3) {
    return <BMI fill={color} />;
  } else if (id == 4) {
    return <Smoking fill={color} />;
  } else if (id == 5) {
    return <Drinking fill={color} />;
  } else if (id == 6) {
    return <Stress fill={color} />;
  } else if (id == 7) {
    return <Sleep fill={color} />;
  }
  return null;
};

export default RenderSvg;
