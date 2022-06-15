import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import moment from 'moment';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import Arrow from 'react-native-vector-icons/AntDesign';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import fonts from 'assets/fonts';

type Props = {
  logData: array;
  navigate: any;
  showMore: string;
  onNextPage?: () => void;
};

const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const navigations = useNavigation();

  const [log, setLog] = React.useState(false);

  const RenderLog = ({ item }) => (
    <TouchableRipple
      onPress={() => {
        try {
          console.log({ item, screen: props.navigate });
          navigations.navigate(props.navigate, { logId: item?.id });
        } catch (error) {
          console.log(error);
        }
      }}
      style={styles.renderLog}
    >
      <>
        <View style={{ width: '40%' }}>
          <Text
            style={{
              color: item?.color ? item?.color : colors.heading,
              fontFamily: fonts.mulishExtraBold,
            }}
          >
            {item?.weight} {item?.unit}
          </Text>
        </View>
        <View style={{ width: '60%', alignItems: 'flex-end' }}>
          <Text
            style={{
              color: colors.blue,
              fontFamily: fonts.mulishRegular,
              fontSize: 12,
            }}
          >
            {moment(item?.date_entry).format('hh:mm a MMMM Do, YYYY')}
          </Text>
        </View>
      </>
    </TouchableRipple>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setLog(!log)} style={styles.logView}>
        <Text
          style={{ color: colors.heading, fontFamily: fonts.OpenSansRegular }}
        >
          LOGS
        </Text>
        <Arrow color={colors.heading} name={log ? 'up' : 'down'} />
      </TouchableOpacity>

      {log &&
        props?.logData?.map((item) => <RenderLog key={item.id} item={item} />)}
      {log && (
        <TouchableOpacity onPress={props.onNextPage}>
          <Text style={styles.showMoreText}>{props?.showMore}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Index;
