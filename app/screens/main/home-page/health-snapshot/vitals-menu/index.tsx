import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

import makeStyles from './styles';
import IMAGES from 'assets/images';
import Pedometer from './pedometer';
import Cardiac from './cardiac';
import Endocrine from './endocrine';
import Sleep from './sleep';
import Lungs from './lungs';
import Exercise from './exercise';
import Calories from './calories';

import { TryvitalsService } from 'services/tryvitals-service/tryvitals-service';
import NoData from '../components/no-data';

const VitalsMenu = () => {
  const [graphType, setGraphType] = useState(1);
  const [isWeekly, setIsWeekly] = useState(false);
  const [data, setData] = useState({});

  const { colors } = useTheme();
  const styles = makeStyles();

  const categories = [
    { id: 1, img: IMAGES.exerciseIcon, selectedImg: IMAGES.pedometerIcon },
    { id: 2, img: IMAGES.moonIcon, selectedImg: IMAGES.moonIcon2 },
    { id: 3, img: IMAGES.exerciseIcon, selectedImg: IMAGES.exerciseIcon2 },
    { id: 4, img: IMAGES.exerciseIcon, selectedImg: IMAGES.caloriesIcon },
    { id: 5, img: IMAGES.heartIcon, selectedImg: IMAGES.heartIcon2 },
    { id: 6, img: IMAGES.dropIcon, selectedImg: IMAGES.dropIcon2 },
    { id: 7, img: IMAGES.lungIcon, selectedImg: IMAGES.lungIcon2 },
  ];

  useEffect(() => {
    TryvitalsService.getDevicesData().then((response) =>
      setData(response.data)
    );
  }, []);

  return (
    <>
      <ScrollView horizontal={true}>
        <View style={styles.options}>
          {categories.map((cat, i) => (
            <TouchableOpacity
              onPress={() => {
                setGraphType(cat.id);
                setIsWeekly(false);
              }}
            >
              <Image
                style={styles.img}
                source={graphType == i + 1 ? cat.selectedImg : cat.img}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {Object.keys(data).length > 0 ? (
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
