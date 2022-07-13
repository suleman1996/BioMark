import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';
import Pedometer from './pedometer';
import Cardiac from './cardiac';
import Endocrine from './endocrine';
import Sleep from './sleep';
import Lungs from './lungs';
import Exercise from './exercise';
import Calories from './calories';
import {
  PedometerIcon,
  ExerciseIcon,
  CaloriesIcon,
  SleepIcon,
  EndocrineIcon,
  CardiacIcon,
  LungIcon,
} from 'assets/svgs';

import { TryvitalsService } from 'services/tryvitals-service/tryvitals-service';
import NoData from '../components/no-data';

const VitalsMenu = () => {
  const [graphType, setGraphType] = useState(1);
  const [isWeekly, setIsWeekly] = useState(false);
  const [data, setData] = useState({});

  const { colors } = useTheme();
  const styles = makeStyles();

  const categories = [
    'Pedometer',
    'Sleep',
    'Exercise',
    'Calories',
    'Cardiac',
    'Endocrine',
    'Lungs',
  ];

  const iconColor = (index: number) =>
    graphType == index + 1 ? '#FFFFFF' : '#8493AE';

  useEffect(() => {
    TryvitalsService.getDevicesData().then((response) => {
      console.log(response);
      setData(response);
    });
  }, []);

  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.options}>
          {categories.map((cat, i) => (
            <TouchableOpacity
              onPress={() => {
                setGraphType(i + 1);
                setIsWeekly(false);
              }}
            >
              <View
                style={[
                  styles.imgContentContainer,
                  {
                    backgroundColor: graphType == i + 1 ? '#1B96D8' : '#F2F4F7',
                  },
                ]}
              >
                {i == 0 && <PedometerIcon color={iconColor(i)} />}
                {i == 1 && <SleepIcon color={iconColor(i)} />}
                {i == 2 && <ExerciseIcon color={iconColor(i)} />}
                {i == 3 && <CaloriesIcon color={iconColor(i)} />}
                {i == 4 && <CardiacIcon color={iconColor(i)} />}
                {i == 5 && <EndocrineIcon color={iconColor(i)} />}
                {i == 6 && <LungIcon color={iconColor(i)} />}
                {graphType == i + 1 && (
                  <Text style={styles.imgContent}>{cat}</Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {data && Object.keys(data).length > 0 ? (
        <>
          <View style={styles.graphContainer}>
            {graphType == 1 && (
              <Pedometer data={data.pedometer} display7Days={isWeekly} />
            )}
            {graphType == 2 && (
              <Sleep data={data.sleep} display7Days={isWeekly} />
            )}
            {graphType == 3 && (
              <Exercise data={data.exercise} display7Days={isWeekly} />
            )}
            {graphType == 4 && (
              <Calories data={data.calories} display7Days={isWeekly} />
            )}
            {graphType == 5 && <Cardiac display7Days={isWeekly} />}
            {graphType == 6 && <Endocrine display7Days={isWeekly} />}
            {graphType == 7 && <Lungs display7Days={isWeekly} />}
          </View>
          <View style={styles.toggleContainer}>
            <Button
              color={isWeekly ? colors.primary : colors.white}
              contentStyle={[
                styles.btnContent,
                !isWeekly && styles.btnSelected,
              ]}
              style={styles.btnContent}
              onPress={() => setIsWeekly(false)}
            >
              24 Hours
            </Button>
            <Button
              color={isWeekly ? colors.white : colors.primary}
              contentStyle={[styles.btnContent, isWeekly && styles.btnSelected]}
              style={styles.btnContent}
              onPress={() => setIsWeekly(true)}
            >
              7 Days
            </Button>
          </View>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default VitalsMenu;
