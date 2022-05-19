import Carousel from 'pinar';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
// import { QRCode, Canvas } from 'easyqrcode-react-native';

type Props = {};

const QRCarousel = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  // 3. Generate QRCode

  return (
    <>
      <View style={styles.container}>
        <Carousel
          showsControls={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          dotsContainerStyle={styles.dotsContainerStyle}
        >
          <View style={styles.slide}>
            <Text style={styles.header}>Your Covid-19 Results</Text>
            <Text style={styles.subHeader}>COVID19 POSITIVE (4/12/2022)</Text>
            {/* <Canvas ref={generateQRCode} /> */}
          </View>
          <View style={styles.slide}>
            {/* <Canvas ref={generateQRCode} /> */}
          </View>
          <View style={styles.slide}>
            {/* <Canvas ref={generateQRCode} /> */}
          </View>
        </Carousel>
      </View>
      <Text style={styles.bottomText1}>Swipe to view other results</Text>
      <Text style={styles.bottomText2}>
        Scan to share latest Covid-19 Test Result
      </Text>
    </>
  );
};

export default QRCarousel;
