// import { Share } from 'react-native';

import Share from 'react-native-share';

// export const onShare = async ({ pdfReport }) => {
//   try {
//     const result = await Share.share({
//       message: 'BioMark: Results OverView',
//       url: pdfReport,
//     });
//     if (result.action === Share.sharedAction) {
//       if (result.activityType) {
//         // shared with activity type of result.activityType
//       } else {
//         // shared
//       }
//     } else if (result.action === Share.dismissedAction) {
//       // dismissed
//     }
//   } catch (error) {
//     console.log('Share error ', error.message);
//   }
// };

export const onShare = async (customOptions) => {
  try {
    await Share.open(customOptions);
  } catch (err) {
    console.log(err);
  }
};
