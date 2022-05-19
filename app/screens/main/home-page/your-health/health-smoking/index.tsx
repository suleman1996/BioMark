import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { heightToDp } from 'utils/functions/responsive-dimensions';

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <View style={styles.backIcon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              color={colors.white}
              size={heightToDp(4)}
              name="arrow-back-ios"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.topBg} />
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.smokingPack}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 14,
              }}
            >
              <Text style={styles.upperLeftText}>Smoking</Text>
              <Text style={styles.upperRightText}>0.0 Pack Years</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={styles.midText}>0.0</Text>
            </View>
            <View style={{ alignItems: 'center', paddingHorizontal: 13 }}>
              <Text style={styles.lowerText}>
                The more pack years you have smoked. the greater the chance of
                getting cancer. in some countaries, it is recomended to have a
                scan of your lungs if you have smoked at least 30 pack years.
                Additonally, smoking increases the risk of many diseases
                including heart disease and stroke. if you have not stopped
                smoking, please speak to your doctor who will be able to help
                you.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.calHeading}>Calculation</Text>
        </View>

        <Text style={styles.calText}>
          Pack-years is a way to measure smoking intensity. It takes into
          account how much and how long you have smoked
        </Text>

        <Text style={styles.calText}>
          It is calculated by dividing the number of cigarettes smoked in a day
          by 20 and then multiplying it by the number of years smoked.
        </Text>
      </View>
      <View style={styles.refrences}>
        <Text style={styles.refrenceHeading}>Refrences</Text>
        <Text style={styles.refrenceSubHeading}>American Cancer Society</Text>
      </View>
    </View>
  );
};

export default Index;
