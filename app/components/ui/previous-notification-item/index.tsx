import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { NotificationMessage } from 'types/api';
import { monthLLLDayDD } from 'utils/functions/date-format';

import makeStyles from './styles';

type Props = {
  item: NotificationMessage;
};

const PreviousNotificationItem = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { item } = props;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome
          color={colors.primary}
          name="plus"
          size={responsiveFontSize(25)}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentHeaderText}>{item.notification_title}</Text>
        <Text style={styles.contentext}>{item.notification_body}</Text>
      </View>
      <Text style={styles.dateText}>{monthLLLDayDD(item.created_at)}</Text>
    </View>
  );
};

export default PreviousNotificationItem;
