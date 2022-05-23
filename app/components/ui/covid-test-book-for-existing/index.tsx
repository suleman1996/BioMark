import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { makeStyles } from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import { responsiveFontSize } from './../../../utils/functions/responsive-text';
import ExpandableView from '@pietile-native-kit/expandable-view';
type Props = {};

const ExisitingBookingForDependent = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [show, setShow] = useState(true);

  function onPress() {
    setShow(!show);
  }

  const selectedDependentBg = true ? { backgroundColor: colors.primary } : {};
  const selectedDependantTxtColor = true
    ? { color: colors.white }
    : { color: colors.darkPrimary };

  return (
    <View style={styles.parent}>
      <Pressable onPress={onPress} style={styles.container}>
        <Text style={styles.titleText}>Dependents</Text>
        <View style={styles.bookingStatusContainer}>
          <Text style={styles.statusText}>Not Booked Yet</Text>
          <Entypo
            size={responsiveFontSize(30)}
            name={show ? 'chevron-small-down' : 'chevron-small-right'}
          />
        </View>
      </Pressable>
      {show ? <View style={styles.headerLine} /> : null}
      <ExpandableView show={show}>
        <View style={styles.expendedContainer}>
          <Text>Choose a Dependent</Text>
          <Pressable
            onPress={onPress}
            style={[styles.dependantConatiner, selectedDependentBg]}
          >
            <Text style={[styles.dName, selectedDependantTxtColor]}>
              Dependents
            </Text>
            <View style={styles.bookingStatusContainer}>
              <Text style={[styles.dType, selectedDependantTxtColor]}>
                Siblings
              </Text>
            </View>
          </Pressable>
        </View>
      </ExpandableView>
    </View>
  );
};

export default ExisitingBookingForDependent;
