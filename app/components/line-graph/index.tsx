import { View } from 'react-native';
import React from 'react';

import { ECharts } from 'react-native-echarts-wrapper';

const Index = ({ chartRef }) => {
  return (
    <View style={{ height: 280, marginTop: 10, marginBottom: 10 }}>
      <ECharts option={{}} ref={chartRef} />
    </View>
  );
};

export default Index;
