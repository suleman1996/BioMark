import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { TimeSlot } from 'types/api';
import { getZonedTime, isZonedTiimeIsPast } from 'utils/functions/date-format';
import makeStyles from './styles';

type Props = {
  slots: TimeSlot[];
  setTime: any;
  time: any;
  testDate: any;
  setTimeFormat: any;
};

const TimeSlots = (props: Props) => {
  const { slots, setTime, time, testDate, setTimeFormat } = props;

  const { colors }: any = useTheme();
  const styles = makeStyles(colors);

  const ifSelected = (id: number) => {
    return time == id
      ? { backgroundColor: colors.primary }
      : { backgroundColor: colors.white };
  };

  const ifSelectedText = (id: number) => {
    return time == id ? { color: colors.white } : { color: colors.smoke };
  };

  const isDisabled = (status: boolean, slot_time: any) => {
    return !status || isZonedTiimeIsPast(testDate, slot_time)
      ? { backgroundColor: colors.gray }
      : {};
  };

  const isBtnDisable = (status: boolean, slot_time: any) => {
    return !status || isZonedTiimeIsPast(testDate, slot_time) ? true : false;
  };

  return (
    <View style={styles.container}>
      {slots?.map((item, index) => (
        <Pressable
          key={index.toString()}
          disabled={isBtnDisable(item.status, item.slot_time)}
          onPress={() => {
            setTime(item.id);
            setTimeFormat(item.slot_time);
          }}
          style={[
            styles.singleTimeItem,
            ifSelected(item.id),
            isDisabled(item.status, item.slot_time),
          ]}
        >
          <Text
            style={[
              styles.singleTimeItemText,
              ifSelectedText(item.id),
              isDisabled(item.status, item.slot_time),
            ]}
          >
            {getZonedTime(testDate, item.slot_time)}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default TimeSlots;
