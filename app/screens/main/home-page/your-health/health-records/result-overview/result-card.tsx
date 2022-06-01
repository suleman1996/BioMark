import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';

import Styles from './styles';
import Filter from 'assets/svgs/filter';

type Props = {};

const Card = ({ item }: Props) => {
  const { colors } = useTheme();

  const styles = Styles(colors);

  const [show, setShow] = React.useState(false);

  const RenderRadio = () => (
    <View
      style={[
        styles.radio,
        {
          backgroundColor:
            item?.status == 'danger' ? colors.white : colors.lightGreen,
          shadowColor: colors.lightGreen,
        },
      ]}
    />
  );

  const RenderMoreInfo = () => (
    <TouchableOpacity
      style={[
        styles.moreView,
        {
          borderColor:
            item?.status == 'danger' ? colors.pureRed : colors.lightGreen,
        },
      ]}
    >
      <Filter
        fill={item?.status == 'danger' ? colors.pureRed : colors.heading}
      />
      <Text
        style={[
          styles.moreText,
          { color: item?.status == 'danger' ? colors.pureRed : colors.heading },
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
            backgroundColor: item?.status == 'danger' ? colors.pureRed : '#fff',
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
                color: item?.status == 'danger' ? colors.white : colors.heading,
              },
            ]}
          >
            {item?.title}
          </Text>
        </View>
        <View style={styles.resultViewHeaderRight}>
          <Text
            style={[
              styles.resultViewHeaderSubTitle,
              { color: item?.status == 'danger' ? colors.white : colors.bg },
            ]}
          >
            {item?.subTitle}
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
                  item?.status == 'danger' ? colors.dangerBg : colors.white,
              },
            ]}
          >
            <Text style={styles.bodyText}>{item?.summary}</Text>
          </View>
          <View
            style={[
              styles.resultViewFooter,
              {
                backgroundColor:
                  item?.status == 'danger' ? colors.dangerBg : colors.white,
              },
            ]}
          >
            <RenderMoreInfo />
          </View>
        </>
      )}
    </View>
  );
  return <RenderResults />;
};

export default Card;
