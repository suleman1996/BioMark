import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from 'react-native-paper';

import Styles from './styles';
import Filter from 'assets/svgs/filter';
import SCREENS from 'navigation/constants/index';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {};

const Card = ({ item, result }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const styles = Styles(colors);

  const [show, setShow] = React.useState(false);
  const [dropdown, setDropDown] = React.useState(true);

  const RenderTitle = ({ data }) => (
    <TouchableOpacity
      onPress={() => setDropDown(!dropdown)}
      style={styles.titleContainer}
    >
      <Text style={styles.renderTitle}>{data?.name}</Text>
      <AntDesign
        color={colors.blue}
        size={15}
        name={dropdown ? 'up' : 'down'}
      />
    </TouchableOpacity>
  );

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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const RenderBioMarkerGrouping = ({ item }) => {
    return item?.map((biomarker) => (
      <View
        style={[
          styles.resultView,
          {
            backgroundColor: colors.white,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            show?.name == biomarker?.name ? setShow('') : setShow(biomarker)
          }
          style={[
            styles.resultViewHeader,
            {
              backgroundColor:
                biomarker?.findings == 'high' || biomarker?.findings == 'low'
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
                    biomarker?.findings == 'high' ||
                    biomarker?.findings == 'low'
                      ? colors.white
                      : colors.heading,
                },
              ]}
            >
              {biomarker?.name}
            </Text>
          </View>
          <View style={styles.resultViewHeaderRight}>
            <Text
              style={[
                styles.resultViewHeaderSubTitle,
                {
                  color:
                    biomarker?.findings == 'high' ||
                    biomarker?.findings == 'low'
                      ? colors.white
                      : colors.bg,
                },
              ]}
            >
              {biomarker?.value} {biomarker?.unit}
            </Text>
          </View>
        </TouchableOpacity>
        {biomarker?.name == show.name && (
          <>
            <View
              style={[
                styles.resultViewBody,
                {
                  backgroundColor:
                    biomarker?.findings == 'high' ||
                    biomarker?.findings == 'low'
                      ? colors.dangerBg
                      : colors.white,
                },
              ]}
            >
              <Text style={styles.bodyText}>{biomarker?.definition}</Text>
            </View>
            <View
              style={[
                styles.resultViewFooter,
                {
                  backgroundColor:
                    biomarker?.findings == 'high' ||
                    biomarker?.findings == 'low'
                      ? colors.dangerBg
                      : colors.white,
                },
              ]}
            >
              <RenderMoreInfo resultId={biomarker?.biomarker_id} />
            </View>
          </>
        )}
      </View>
    ));
  };

  const RenderResults = () => (
    <>
      <RenderTitle data={result} />

      {dropdown ? <RenderBioMarkerGrouping item={result.biomarker} /> : null}
    </>
  );
  return <RenderResults />;
};

export default Card;
