import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';

import makeStyles from './styles';
import { formatBarData, formatPieData } from '../utils';
import NoData from '../../components/no-data';

const styles = makeStyles();
const COLORS = ['#1B96D8', '#C9E1F2', '#054E8B', '#4FBBE2'];

type ActivityProps = {
  id: number;
  activity: {
    label: string;
    value: string;
  };
};

const Activity = (props: ActivityProps) => {
  const { id, activity } = props;

  return (
    <View style={styles.details}>
      <View style={styles.activityHeaderContainer}>
        <Text
          style={[styles.activityHeaderColor, { backgroundColor: COLORS[id] }]}
        />
        <Text style={styles.activityHeader}>{activity.label}</Text>
      </View>
      <View style={styles.activityContentContainer}>
        <Text style={styles.activityContent}>{activity.value}</Text>
        <Text style={styles.activityContentType}>hours</Text>
      </View>
    </View>
  );
};

type SleepProps = {
  data: {
    one_day: {
      total: number;
      activities: Array<{
        value: string;
        percent: number;
        label: string;
      }>;
    };
    seven_days: Array<{
      label: string;
      value: number | string;
    }>;
  };
  display7Days: Boolean;
};

const Sleep = (props: SleepProps) => {
  const { data, display7Days } = props;

  return (
    <View style={{ alignItems: 'center' }}>
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
          <>
            <PieChart
              donut
              innerRadius={70}
              radius={80}
              data={formatPieData(data.one_day.activities, COLORS)}
              centerLabelComponent={() => (
                <View style={styles.middleTextContainer}>
                  <Text style={styles.middleText}>{data.one_day.total}</Text>
                  <Text style={styles.middleTextType}>hours</Text>
                </View>
              )}
            />
            <View style={styles.view}>
              {data.one_day.activities.map((activity, id) => (
                <Activity id={id} activity={activity} />
              ))}
            </View>
          </>
        )
      ) : (
        <NoData />
      )}
    </View>
  );
};

export default Sleep;
