import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useSelector } from 'react-redux';

import PreviousNotificationItem from 'components/ui/previous-notification-item';

import { widthToDp } from 'utils/functions/responsive-dimensions';

import { IAppState } from 'store/IAppState';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

type props = {
  isReadMoreInboxNoti?: any;
  allInboxNotificationsData?: any;
};

export default function PreviousNotification(props: props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  // redux state all inbox
  const allInboxNotificationsData = useSelector(
    (state: IAppState) => state.notifications.allInboxNotifications
  );

  return (
    <View style={styles.previousNotificationContainer}>
      <View style={styles.blackLine} />
      <View style={styles.headerContainer}>
        <Text style={styles.prevHeaderText}>
          {t('pages.more.links.previousNotifications')}
        </Text>
      </View>
      <FlatList
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: widthToDp(86) }}
        keyExtractor={(item, index) => index.toString()}
        data={allInboxNotificationsData}
        renderItem={PreviousNotificationItem}
        ListFooterComponent={() => {
          return (
            <>
              {props.isReadMoreInboxNoti &&
              props.allInboxNotificationsData.length > 0 ? (
                <Pressable
                  // onPress={() => {
                  //   setCurrentPageInboxNoti(currentPageInboxNoti + 1);
                  // }}
                  style={styles.readMoreContainer}
                >
                  <Text style={styles.readMoreText}>
                    {t('common.showMoree')}
                  </Text>
                </Pressable>
              ) : null}
            </>
          );
        }}
      />
    </View>
  );
}
