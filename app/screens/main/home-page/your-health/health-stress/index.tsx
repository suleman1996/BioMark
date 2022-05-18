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
              <Text style={styles.upperLeftText}>Stress</Text>
              <Text style={styles.upperRightText}>Normal</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Text style={styles.midText}>5</Text>
            </View>
            <View style={{ alignItems: 'center', paddingHorizontal: 13 }}>
              <Text style={styles.lowerText}>
                Your score indicates that you are experiencing a low level of
                stress. Maintaining a healthy level of stress is important for
                your overall health and wellbeing.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.calHeading}>Description</Text>
        </View>

        <Text style={styles.calText}>
          Percieved Stress Scale are among the most widely used tools to measure
          perecieved stress. This particular questionaire uses PSS-4 framework.
        </Text>
      </View>
      <View style={styles.refrences}>
        <Text style={styles.refrenceHeading}>Refrences</Text>
        <Text style={styles.refrenceSubHeading}>
          https:://www.ncbi.mih.gov/pmc/articles/PMC5791241/
        </Text>
      </View>
    </View>
  );
};

export default Index;
