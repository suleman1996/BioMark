import React from 'react';
import { View } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';
import NoData from '../../components/no-data';

// import { endocrineData1Day, endocrineData7Days } from '../data';

const Endocrine = () => {
  // const { display7Days } = props;

  return (
    // <View style={{ marginTop: 50 }}>
    //   <BarChart
    //     data={display7Days ? endocrineData7Days : endocrineData1Day}
    //     hideRules
    //     barMarginBottom={10}
    //     barWidth={15}
    //     barBorderRadius={10}
    //     xAxisLabelTextStyle={{ fontSize: 10, color: '#8493AE' }}
    //   />
    // </View>
    <View style={{ marginTop: 20, alignItems: 'center' }}>
      <NoData />
    </View>
  );
};

export default Endocrine;
