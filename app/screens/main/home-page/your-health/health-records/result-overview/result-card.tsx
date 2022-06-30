import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'react-native-paper';

import Styles from './styles';
import Filter from 'assets/svgs/filter';
import SCREENS from 'navigation/constants/index';

type Props = {};

const Card = ({ item }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const styles = Styles(colors);

  const [show, setShow] = React.useState(false);

  const RenderRadio = () => (
    <View
      style={[
        styles.radio,
        {
          backgroundColor:
            item?.findings == 'high' || item?.findings == 'low'
              ? colors.white
              : colors.lightGreen,
          shadowColor: colors.lightGreen,
        },
      ]}
    />
  );

  const RenderMoreInfo = ({ resultId }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(SCREENS.MORE_INFO, { result_id: resultId })
      }
      style={[
        styles.moreView,
        {
          borderColor:
            item?.findings == 'high' || item?.findings == 'low'
              ? colors.pureRed
              : colors.lightGreen,
        },
      ]}
    >
      <Filter
        fill={
          item?.findings == 'high' || item?.findings == 'low'
            ? colors.pureRed
            : colors.heading
        }
      />
      <Text
        style={[
          styles.moreText,
          {
            color:
              item?.findings == 'high' || item?.findings == 'low'
                ? colors.pureRed
                : colors.heading,
          },
        ]}
      >
        More Info
      </Text>
    </TouchableOpacity>
  );

  const RenderResults = () => (
    <View
      style={[
        styles.resultView,
        {
          backgroundColor: colors.white,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => setShow(!show)}
        style={[
          styles.resultViewHeader,
          {
            backgroundColor:
              item?.findings == 'high' || item?.findings == 'low'
                ? colors.pureRed
                : '#fff',
          },
        ]}
      >
        <View style={styles.resultViewHeaderLeft}>
          <RenderRadio />
        </View>
        <View style={styles.resultViewHeaderCenter}>
          <Text
            style={[
              styles.resultViewHeaderTitle,
              {
                color:
                  item?.findings == 'high' || item?.findings == 'low'
                    ? colors.white
                    : colors.heading,
              },
            ]}
          >
            {item?.name}
          </Text>
        </View>
        <View style={styles.resultViewHeaderRight}>
          <Text
            style={[
              styles.resultViewHeaderSubTitle,
              {
                color:
                  item?.findings == 'high' || item?.findings == 'low'
                    ? colors.white
                    : colors.bg,
              },
            ]}
          >
            {item?.value} {item?.unit}
          </Text>
        </View>
      </TouchableOpacity>
      {show && (
        <>
          <View
            style={[
              styles.resultViewBody,
              {
                backgroundColor:
                  item?.findings == 'high' || item?.findings == 'low'
                    ? colors.dangerBg
                    : colors.white,
              },
            ]}
          >
            <Text style={styles.bodyText}>{item?.definition}</Text>
          </View>
          <View
            style={[
              styles.resultViewFooter,
              {
                backgroundColor:
                  item?.findings == 'high' || item?.findings == 'low'
                    ? colors.dangerBg
                    : colors.white,
              },
            ]}
          >
            <RenderMoreInfo resultId={item?.biomarker_id} />
          </View>
        </>
      )}
    </View>
  );
  return <RenderResults />;
};

export default Card;
