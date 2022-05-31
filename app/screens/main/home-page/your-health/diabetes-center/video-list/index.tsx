import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from './style';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
import { getReduxPspPdfLink } from 'store/home/home-actions';
import Video from 'react-native-video';
import { ActivityIndicator } from 'components';

const VideoList = ({ route }) => {
  const { colors } = useTheme();
  const [videoLink, setVideoLink] = useState('');
  const [isVisiable, setIsVisible] = React.useState(false);
  const styles = Styles(colors);
  const dispatch = useDispatch();
  const pspVideoLinks = useSelector(
    (state: IAppState) => state.home.PspDataContents
  );

  const item = route.params.code;

  useEffect(() => {
    videoData();
  });

  const videoData = () => {
    try {
      setIsVisible(true);
      dispatch(getReduxPspPdfLink(item.code));
      console.log('---------item-------------', item);
      console.log('------link-----', pspVideoLinks);
      setVideoLink(pspVideoLinks.link);
      setIsVisible(false);
    } catch (err) {
      setIsVisible(false);
      console.log(err);
    }
  };

  return (
    <View style={styles.listView}>
      <ActivityIndicator visible={isVisiable} />
      <Video
        source={{
          uri: videoLink,
        }}
        controls={true}
        paused={true}
        style={styles.backgroundVideo}
        repeat={true}
        playWhenInactive={true}
        resizeMode="contain"
        fullscreen={true}
        onLoadStart={() => {
          console.log('start auto');
        }}
        // posterResizeMode={'stretch'}
        // poster={item.thumbnail}
      />
    </View>
  );
};

export default VideoList;
