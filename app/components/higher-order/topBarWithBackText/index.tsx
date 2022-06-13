import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize } from 'utils/functions/responsive-text';

type Props = {
  onBackPress: any;
};

const TopBarWithBackText = ({ onBackPress }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Pressable onPress={onBackPress} style={styles.topBar}>
        <Ionicons
          color={colors.black}
          size={responsiveFontSize(28)}
          name="arrow-back"
        />
        <Text style={styles.topBarBackText}>Back</Text>
      </Pressable>
    </View>
  );
};

export default TopBarWithBackText;
