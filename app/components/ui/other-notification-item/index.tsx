import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { NotificationMessage } from 'types/api';
import { monthLLLDayDD } from 'utils/functions/date-format';

import makeStyles from './styles';

type Props = {
  item: NotificationMessage;
  getIcon?: any;
  onPress?: any;
};

const OtherNotificationItem = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { item, getIcon, onPress } = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {getIcon(item.notification_type)}
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeaderText}>
            {item.notification_title}
          </Text>
          <Text style={styles.contentext}>{item.notification_body}</Text>
        </View>
        <Text style={styles.dateText}>{monthLLLDayDD(item.created_at)}</Text>
      </View>
    </Pressable>
  );
};

export default OtherNotificationItem;
