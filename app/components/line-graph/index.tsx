import { View } from 'react-native';
import React from 'react';

import { ECharts } from 'react-native-echarts-wrapper';
import { heightToDp } from 'utils/functions/responsive-dimensions';

// const Index = ({ chartRef, lagendChartRef, showLegend }) => {
//   return (
//     <View style={{ height: 280, marginTop: 10, marginBottom: 10 }}>
//       {showLegend ? (
//         <View
//           style={{
//             height: 100,
//             width: 30,
//             left: 30,
//             position: 'absolute',
//             zIndex: 2,
//           }}
//         >
//           <ECharts option={{}} ref={lagendChartRef} />
//         </View>
//       ) : null}
//       <View
//         style={{
//           left: 40,
//           height: 100,
//           // width: 'calc(100% - 40px)',
//           opacity: 100,
//           position: 'absolute',
//           zIndex: 3,
//         }}
//       >
//         <ECharts option={{}} ref={chartRef} />
//       </View>
//     </View>
//   );
// };

const Index = ({ chartRef, lagendChartRef, showLegend }) => {
  console.log('I was called again');
  return (
    <View
      style={{
        height: heightToDp(45),
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      {showLegend ? (
        <View style={{ width: '10%' }}>
          <ECharts option={{}} ref={lagendChartRef} />
        </View>
      ) : null}

      <View style={{ width: showLegend ? '90%' : '100%' }}>
        <ECharts option={{}} ref={chartRef} />
      </View>
    </View>
  );
};

export default Index;
