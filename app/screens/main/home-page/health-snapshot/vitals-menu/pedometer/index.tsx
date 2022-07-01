import React from 'react';
import { Dimensions, View } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { BarChart } from 'react-native-gifted-charts';
import NoData from '../../components/no-data';

import { formatBarData } from '../utils';
import makeStyles from './styles';

type Props = {
  data: {
    one_day: number;
    seven_days: Array<{ label: string; value: number }>;
  };
  display7Days: Boolean;
};

const Pedometer = (props: Props) => {
  const { data, display7Days } = props;

  const styles = makeStyles();

  return (
    <View style={styles.container}>
      {data && Object.keys(data).length > 0 ? (
        display7Days ? (
          <BarChart
            width={Dimensions.get('window').width * 0.7}
            barWidth={25}
            noOfSections={5}
            barBorderRadius={4}
            showGradient
            data={formatBarData(data?.seven_days)}
            hideRules
            xAxisLabelTextStyle={styles.xAxisLabel}
            yAxisTextStyle={styles.yAxisLabel}
            initialSpacing={5}
            isAnimated={true}
          />
        ) : (
          <CircularProgress
            value={data?.one_day}
            radius={110}
            maxValue={data?.one_day * 1.25}
            progressValueColor="#2A1252"
            progressValueFontSize={28}
            title={'Steps'}
            titleColor="#8493AE"
            titleStyle={styles.content}
            activeStrokeColor="#1B96D8"
            activeStrokeWidth={20}
            inActiveStrokeOpacity={0.2}
            inActiveStrokeWidth={10}
          />
        )
      ) : (
        <NoData />
      )}
    </View>
  );
};

export default Pedometer;
