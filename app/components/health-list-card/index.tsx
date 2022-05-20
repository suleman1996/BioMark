import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

type Props = {
  title?: string;
  text?: string;
  image?: any;
  data?: any;
};
const HealthListCard = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.flatlistView}>
        <View style={styles.flatlistView2}>
          <Image source={item.image} style={styles.flatlistImage} />
          <Text style={styles.flatlisttext}>{item.title}</Text>
        </View>
        <Text style={styles.flatlisttext2}>{item.text}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default HealthListCard;
