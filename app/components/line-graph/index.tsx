import { View } from 'react-native';
import React from 'react';

import { ECharts } from 'react-native-echarts-wrapper';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { BarIndicator } from 'react-native-indicators';
import { useTheme } from 'react-native-paper';

const Index = ({ chartRef, lagendChartRef, showLegend, isLoading }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: heightToDp(showLegend ? 45 : 35),
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
      {isLoading && (
        <View
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.transparentWhite,
          }}
        >
          <BarIndicator color={colors.blue} size={40} />
        </View>
      )}
    </View>
  );
};

export default Index;
