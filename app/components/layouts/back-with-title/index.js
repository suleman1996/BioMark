import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveFontSize } from './../../../utils/functions/responsiveText';
import { heightToDp, widthToDp } from '../../../utils/functions/responsiveDimentions';
import { GlobalColors } from './../../../utils/theme/globalColors';
import { GlobalFonts } from './../../../utils/theme/fonts';
import { GlobalStyles } from './../../../utils/theme/globalStyles';
import { hitSlop } from './../../../constants/hitSlop';
import { goBack } from './../../../services/navRef';

const TitleWithBackLayout = ({children, title}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable hitSlop={hitSlop.one} onPress={() => goBack()}>
          <MaterialIcons
            color={GlobalColors.white}
            size={responsiveFontSize(35)}
            name="arrow-back-ios"
          />
        </Pressable>
        <View>
          <Text style={styles.textStyle}>{title ? title : ''}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

export default TitleWithBackLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: widthToDp(100),
    backgroundColor: GlobalColors.primary,
    paddingHorizontal: widthToDp(4),
    paddingTop: heightToDp(2.5),
    paddingBottom: heightToDp(2),
    ...GlobalStyles.shadow
  },
  titleContainer: {
    paddingVertical: heightToDp(1),
  },
  textStyle: {
    fontSize: responsiveFontSize(22),
    fontFamily: GlobalFonts.medium,
    marginTop: heightToDp(2),
    color: GlobalColors.white
  }
});