import { View, ImageBackground } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import BlurView from '../blur-view';
const RenderHighlights = ({ item }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  console.log('item', item);

  return (
    <View style={styles.highlightsView}>
      <ImageBackground
        style={{ flex: 1 }}
        // resizeMode="stretch"
        source={{ uri: item.image }}
      >
        <BlurView title={item.title} />
      </ImageBackground>
    </View>
  );
};
export default RenderHighlights;
