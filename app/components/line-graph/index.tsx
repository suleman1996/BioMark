import { View } from 'react-native';
import React from 'react';

import { ECharts } from 'react-native-echarts-wrapper';

const Index = () => {
  const [option] = React.useState({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  });
  return (
    <View style={{ height: '45%', marginTop: 10 }}>
      <ECharts option={option} backgroundColor={'#3D3D3D10'} />
    </View>
  );
};

export default Index;
