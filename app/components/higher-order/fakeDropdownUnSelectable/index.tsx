import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { responsiveFontSize } from 'utils/functions/responsive-text';
import makeStyles from './styles';

type Props = {
  title: string;
  onPress: any;
};
const FakeDropdownUnSelectable = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { title, onPress } = props;

  if (title) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
        <Pressable onPress={onPress}>
          <Icon
            name="ios-information-circle-outline"
            size={responsiveFontSize(35)}
            color={colors.darkPrimary}
          />
        </Pressable>
      </View>
    );
  } else {
    return null;
  }
};

export default FakeDropdownUnSelectable;
