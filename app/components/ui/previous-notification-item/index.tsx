import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { NotificationMessage } from 'types/api';
import { monthLLLDayDD } from 'utils/functions/date-format';

import makeStyles from './styles';

type Props = {
  item: NotificationMessage;
  onPress: any;
  getIcon?: any;
};

const PreviousNotificationItem = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { item, onPress, getIcon } = props;
  console.log('previous Notification inbox', item);

  return (
    <Pressable onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.iconContainer}>
          {getIcon(item.notification_type)}
        </View>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.contentHeaderText}>
              {item.notification_title}
            </Text>
          </View>
          <Text style={styles.dateText}>{monthLLLDayDD(item.created_at)}</Text>
        </View>
      </View>
      <View style={styles.descriptionDataContainer}>
        <Text style={styles.contentext}>{item.notification_body}</Text>
      </View>
    </Pressable>
  );
};

export default PreviousNotificationItem;
