import { View } from 'react-native';
import React from 'react';

import { ECharts } from 'react-native-echarts-wrapper';

const Index = () => {
  const [option] = React.useState({
    xAxis: {
      type: 'category',
      data: ['6pm', '12am', '6am', '12pm'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [0, 20, 40, 60],
        type: 'line',
      },
    ],
  });
  return (
    <View style={{ height: 280, marginTop: 10 }}>
      <ECharts option={option} backgroundColor={'#3D3D3D10'} />
    </View>
  );
};

export default Index;
