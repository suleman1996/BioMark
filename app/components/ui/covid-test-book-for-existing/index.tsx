import ExpandableView from '@pietile-native-kit/expandable-view';
import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import CircleBtn from '../../button/circleBtn';
import { responsiveFontSize } from './../../../utils/functions/responsive-text';
import { makeStyles } from './styles';
type Props = {};

const ExisitingBookingForDependent = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [show, setShow] = useState(true);
  const [selectedDependant, setSelectedDependant] = useState(-1);

  function onPress() {
    setShow(!show);
  }

  const _renderItemForDependants = ({ item, index }: any) => {
    const {} = item;
    const selectedDependentBg =
      selectedDependant === index ? { backgroundColor: colors.primary } : {};
    const selectedDependantTxtColor =
      selectedDependant === index
        ? { color: colors.white }
        : { color: colors.darkPrimary };
    return (
      <Pressable
        onPress={() => {
          setSelectedDependant(index);
        }}
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
    );
  };

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
          <Text style={styles.innerTitle}>Choose a Dependent</Text>
          <FlatList renderItem={_renderItemForDependants} data={[1, 2, 3]} />
          <View
            style={[styles.headerLine, { marginVertical: heightToDp(2) }]}
          />
          <Text style={styles.innerTitle}>
            Where would you like to get tested?
          </Text>
          <View style={styles.getTestedContainer}>
            <View style={styles.btnContainer}>
              <CircleBtn
                icon={
                  <Entypo
                    size={responsiveFontSize(50)}
                    name="squared-plus"
                    color={colors.white}
                  />
                }
              />
              <Text style={styles.innerTitle}>Test Center</Text>
            </View>
            <View style={styles.btnContainer}>
              <CircleBtn
                disabled={true}
                icon={
                  <Entypo
                    size={responsiveFontSize(50)}
                    name="home"
                    color={colors.darkGray}
                  />
                }
              />
              <Text style={styles.innerTitle}>Home Test</Text>
              <Text style={styles.innerSmallTxt}>Comming soon</Text>
            </View>
          </View>
        </View>
      </ExpandableView>
    </View>
  );
};

export default ExisitingBookingForDependent;
