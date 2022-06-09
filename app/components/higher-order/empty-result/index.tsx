import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { makeStyles } from './styles';

type Props = {
  icon: any;
  title: string;
  subTitle: string;
};

const EmptyResultComponent = (props: Props) => {
  const { icon, title, subTitle } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

export default EmptyResultComponent;
