import fonts from 'assets/fonts';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import RNQRGenerator from 'rn-qr-generator';
import { CovidLatestResponse, CovidResult } from 'types/api';
import makeStyles from './styles';
import BioSearchIcon from 'components/svg/bio-search-icon';

type Props = {
  data: CovidLatestResponse;
};

const ImageQrRenderer = ({ link }: { link: string }) => {
  const [qrImg, setQrImg] = useState('');

  useEffect(() => {
    RNQRGenerator.generate({
      value: link,
      height: 400,
      width: 400,
    })
      .then((response) => {
        const { uri } = response;
        setQrImg(uri);
      })
      .catch((error) => console.log('Cannot create QR code', error));
  }, [link]);
  return (
    <>
      <Image
        resizeMode="cover"
        source={{ uri: qrImg }}
        style={{ width: 256, height: 256 }}
      />
    </>
  );
};

const QRCarousel = (props: Props) => {
  const { data } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [currentDot, setCurrentDot] = useState(0);

  const { results = [] } = {
    results: data?.results,
  };

  const _renderSingleItem = ({
    item,
    index,
  }: {
    item: CovidResult;
    index: number;
  }) => {
    const { result = '', date = '' } = {
      result: item.result,
      date: item.result_date?.split(' ')?.join('/')?.substring(1),
    };
    const isGreen =
      result?.toLocaleLowerCase() == 'negative'
        ? { color: colors.lightGreen, fontFamily: fonts.bold }
        : { color: colors.red, fontFamily: fonts.bold };
    return (
      <>
        <Pressable onPress={() => setCurrentDot(index)} style={styles.slide}>
          <Text style={styles.header}>Your Covid-19 Results</Text>
          <Text style={styles.subHeader}>
            COVID19 <Text style={[styles.subHeader, isGreen]}>{result}</Text> (
            {date})
          </Text>

          <ImageQrRenderer link={item.link} />
        </Pressable>
      </>
    );
  };

  const _renderEmptyView = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ textAlign: 'center' }}>
          <BioSearchIcon width={25} height={25} />
        </Text>
        <Text style={styles.emptyText1}>No QR Code Yet</Text>
        <Text style={styles.emptyText2}>QR Codes will be displayed here</Text>
        <Text style={styles.emptyText3}>
          When you receive your COVID results
        </Text>
      </View>
    );
  };

  const _onViewableItemsChanged = React.useCallback(({ changed }) => {
    //  console.log('Visible items are', viewableItems);
    console.log('Changed in this iteration, ', changed);
    setCurrentDot(changed[0]?.index);
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 60,
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={_renderSingleItem}
          data={results}
          // data={[]}
          ListEmptyComponent={_renderEmptyView}
        />
        <View style={styles.dotsContainerStyle}>
          {results.map((tiem, index) => {
            return (
              <View
                style={[
                  currentDot == index ? styles.activeDotStyle : styles.dotStyle,
                ]}
              />
            );
          })}
        </View>
      </View>
      <Text style={styles.bottomText1}>Swipe to view other results</Text>
      <Text style={styles.bottomText2}>
        Scan to share latest Covid-19 Test Result
      </Text>
    </>
  );
};

export default QRCarousel;
