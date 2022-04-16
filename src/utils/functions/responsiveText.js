import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const ifHeightGreater1520 = height > 1530 ? 1 : 0.9;
const ifHeightGreater1520IOS = height > 1530 ? 1.1 : 1;
export function responsiveFontSize(fontSize) {
  if (fontSize === undefined) {
    return fontSize;
  }

  let ratioX = 0;
  if (Platform.OS === 'ios') {
    ratioX =
      width < 375
        ? width < 320
          ? 0.75
          : 0.875
        : width > 750
          ? 1.1
          : ifHeightGreater1520IOS;
  } else if (Platform.OS === 'android') {
    ratioX =
      width < 361
        ? width <= 320
          ? 0.75
          : 0.875
        : width >= 750
          ? 1.1
          : ifHeightGreater1520;
  }

  return ratioX * fontSize;
}