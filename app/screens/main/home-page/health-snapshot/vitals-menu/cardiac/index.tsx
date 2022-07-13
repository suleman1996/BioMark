import React from 'react';
import { View } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';

import NoData from '../../components/no-data';
// import { formatBarData } from '../utils';
// import makeStyles from './styles';

// type CardiacProps = {
//   data: {
//     one_day: {
//       total: number;
//       activities: Array<{
//         value: string;
//         percent: number;
//         label: string;
//       }>;
//     };
//     seven_days: Array<{
//       label: string;
//       value: number | string;
//     }>;
//   };
//   display7Days: Boolean;
// };

// const Cardiac = (props: CardiacProps) => {
const Cardiac = () => {
  // const { display7Days } = props;

  return (
    // <View style={{ marginTop: 20, alignItems: 'center' }}>
    //   {data && Object.keys(data).length > 0 ? (
    //     display7Days ? (
    //       data?.seven_days.length > 0 ? (
    //         <BarChart
    //           width={Dimensions.get('window').width * 0.7}
    //           barWidth={25}
    //           noOfSections={5}
    //           barBorderRadius={4}
    //           showGradient
    //           data={formatBarData(data?.seven_days)}
    //           hideRules
    //           xAxisLabelTextStyle={styles.xAxisLabel}
    //           yAxisTextStyle={styles.yAxisLabel}
    //           initialSpacing={5}
    //           isAnimated={true}
    //         />
    //       ) : (
    //         <NoData />
    //       )
    //     ) : data?.one_day ? (
    //       <BarChart
    //         data={formatBarData(data.one_day)}
    //         hideRules
    //         barMarginBottom={10}
    //         barWidth={15}
    //         barBorderRadius={10}
    //         xAxisLabelTextStyle={{ fontSize: 10, color: '#8493AE' }}
    //       />
    //     ) : (
    //       <NoData />
    //     )
    //   ) : (
    //     <NoData />
    //   )}
    //   </View>
    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <NoData />
    </View>
  );
};

export default Cardiac;
