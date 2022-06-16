import { View } from 'react-native';
import React from 'react';

import { ECharts } from 'react-native-echarts-wrapper';
import { heightToDp } from 'utils/functions/responsive-dimensions';

const Index = ({ chartRef, lagendChartRef, showLegend }) => {
  return (
    <View
      style={{
        height: heightToDp(35),
        marginTop: 0,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      {showLegend ? (
        <View style={{ width: '10%' }}>
          <ECharts ref={lagendChartRef} />
        </View>
      ) : null}

      <View style={{ width: showLegend ? '90%' : '100%' }}>
        <ECharts ref={chartRef} />
      </View>
    </View>
  );
};

export default Index;
