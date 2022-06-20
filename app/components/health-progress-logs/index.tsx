import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { useMemo } from 'react';

import moment from 'moment';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Arrow from 'react-native-vector-icons/AntDesign';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import fonts from 'assets/fonts';

import { responsiveFontSize } from 'utils/functions/responsive-text';

type Props = {
  logData: [];
  navigate: any;
  showMore: string;
  onNextPage?: () => void;
  onNavigate?: () => void;
};

const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigations = useNavigation();

  const [log, setLog] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const maxPage = useMemo(
    () => Math.ceil((props?.logData?.length || 0) / 20),
    [props.logData]
  );

  const RenderLog = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        try {
          // console.log({ item, screen: props.navigate });
          props.onNavigate && props.onNavigate();
          setTimeout(() => {
            navigations.navigate(props.navigate, { logId: item?.id });
          }, 5);
        } catch (error) {
          console.log(error);
        }
      }}
      style={styles.renderLog}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View>
          <Text
            style={{
              color: item?.color ? item?.color : colors.heading,
              fontFamily: fonts.mulishExtraBold,
              fontSize: responsiveFontSize(20),
            }}
          >
            {item?.weight} {item?.unit}
          </Text>
        </View>
        <View
          style={{
            width: '60%',
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              color: colors.heading,
              fontFamily: fonts.mulishRegular,
              fontSize: responsiveFontSize(15),
            }}
          >
            {moment(item?.date_entry).format('hh:mm a MMMM Do, YYYY')}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setLog(!log)} style={styles.logView}>
        <Text
          style={{ color: colors.heading, fontFamily: fonts.OpenSansRegular }}
        >
          LOGS
        </Text>
        <Arrow color={colors.heading} name={log ? 'up' : 'down'} />
      </TouchableOpacity>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: styles.renderLog.height * 4 }}
      >
        {log && (
          <FlatList
            data={props.logData.slice(0, 20 * page)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <RenderLog key={item} item={item} />}
            contentContainerStyle={styles.logsList}
          />
        )}
        {log &&
          (page == maxPage || !maxPage ? (
            <Text style={styles.showMoreText}>No more data to show</Text>
          ) : (
            <TouchableOpacity onPress={() => setPage((prev) => prev + 1)}>
              <Text style={styles.showMoreText}>{props?.showMore}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Index;
