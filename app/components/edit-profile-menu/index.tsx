import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from 'components/button';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { styles } from './styles';

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
