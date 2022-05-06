import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'assets/colors';
import fonts from 'assets/fonts';
import { Button } from 'components/button';
import { responsiveFontSize } from 'utils/functions/responsive-text';

type Props = {
  onPressPhoto: any;
  onPressGallery: any;
  visible: boolean;
  iconPress: any;
};

export default function EditProfileModal({
  visible = false,
  onPressPhoto,
  onPressGallery,
  iconPress,
}: Props) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <View style={styles.view}>
        <Text style={styles.heading}>Change Profile Image</Text>
        <MaterialCommunityIcons
          name={'close'}
          size={responsiveFontSize(28)}
          style={{ position: 'absolute', right: 20, top: 20 }}
          onPress={iconPress}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={onPressPhoto}
            marginHorizontal={10}
            marginVertical={-5}
            title="Take Photo"
          />
          <Button
            onPress={onPressGallery}
            marginHorizontal={10}
            title="Upload From Gallery"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: colors.bg,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  view: {
    width: '90%',
    backgroundColor: colors.whiteColor,
    borderRadius: 5,
    padding: 20,
    paddingBottom: 10,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
    color: colors.placeHolder,
  },
  heading: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    color: colors.heading,
    marginBottom: 5,
  },
});
