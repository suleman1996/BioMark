import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { Button } from 'components/button';

import makeStyles from './styles';

type Props = {
  onPress: any;
  visible: boolean;
};

export default function ErrorModal({ visible = false, onPress }: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overLay}>
      <View style={styles.view}>
        <Text style={styles.heading}>Please try again</Text>
        <Text style={styles.text}>
          The information provided does not match our records. Kindly check and
          try again. If this is your first time with us, please sign up. Thank
          you.
        </Text>
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={onPress}
            marginHorizontal={10}
            marginVertical={10}
            title="Ok"
          />
        </View>
      </View>
    </View>
  );
}
