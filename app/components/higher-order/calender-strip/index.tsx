import React from 'react';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useTheme } from 'react-native-paper';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { makeStyles } from './styles';

type Props = {
  setValue: any;
};

const CalenderStrip = (props: Props) => {
  const { setValue } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      <CalendarStrip
        onDateSelected={(date) => {
          // logNow(date.toISOString().slice(0, 10))
          setValue(date.toISOString().slice(0, 10));
        }}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: 'white',
        }}
        iconStyle={styles.iconStyle}
        scrollable={true}
        useNativeDriver
        style={{ height: heightToDp(10), paddingBottom: 10 }}
        calendarHeaderStyle={{
          color: colors.black,
          fontFamily: GlobalFonts.regular,
          fontSize: responsiveFontSize(15),
          fontWeight: '600',
          alignSelf: 'flex-start',
          paddingLeft: widthToDp(3),
        }}
        calendarColor={colors.white}
        dateNumberStyle={{ color: 'black' }}
        dateNameStyle={{ color: 'black' }}
        highlightDateNumberContainerStyle={{
          minWidth: widthToDp(7),
        }}
        highlightDateNumberStyle={styles.highlightDateNumberStyle}
        highlightDateNameStyle={styles.highLightDateName}
        disabledDateNameStyle={styles.disabledDateNameStyle}
        disabledDateNumberStyle={styles.disabledDateNumberStyle}
        iconContainer={{ flex: 0.00001 }}
      />
    </View>
  );
};

export default CalenderStrip;
