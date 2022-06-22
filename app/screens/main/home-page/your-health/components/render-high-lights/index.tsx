import { View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import BlurView from '../blur-view';
const RenderHighlights = ({ item, onPress }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  // console.log('item', item.filename.url);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.highlightsView}>
        <ImageBackground
          style={{ flex: 1 }}
          // resizeMode="stretch"
          source={{ uri: item.filename.url }}
        >
          <BlurView title={item.caption} />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};
export default RenderHighlights;
