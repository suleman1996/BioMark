import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux';

import { TitleWithSearchBarLayout } from 'components/layouts';
import OtherNotificationItem from 'components/ui/other-notification-item';
import PreviousNotificationItem from 'components/ui/previous-notification-item';

import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import {
  addAllInboxNotifications,
  getAllInboxNotificationsR,
  getAllOtherNotificationsR,
  addAllOtherNotifications,
  getAllOtherUnreadNotificationsR,
} from 'store/notifications/notification-actions';
import { IAppState } from 'store/IAppState';
import { logNow } from 'utils/functions/log-binder';
import { notificationsService } from 'services/notification-service';

import makeStyles from './styles';

export default function InboxScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  // redux state all inbox
  const allInboxNotificationsData = useSelector(
    (state: IAppState) => state.notifications.allInboxNotifications
  );
  // redux state all others
  const allOthersNotificationsData = useSelector(
    (state: IAppState) => state.notifications.allOthersNotifications
  );

  // redux state all others unread
  const allOthersUnreadNotificationsData = useSelector(
    (state: IAppState) => state.notifications.allOthersUnreadNotifications
  );

  const [isReadMoreInboxNoti, setIsReadMoreInboxNoti] = useState(true);
  const [currentPageInboxNoti, setCurrentPageInboxNoti] = useState(1);

  const [isReadMoreOtherNoti, setIsReadMoreOtherNoti] = useState(true);
  const [currentPageOtherNoti, setCurrentPageOtherNoti] = useState(1);

  const dispatch = useDispatch();
  const focused = useIsFocused();

  /*eslint-disable */
  const _getAllInboxData = async () => {
    await dispatch(getAllInboxNotificationsR(1));
    await dispatch(getAllOtherNotificationsR(1));
    await dispatch(getAllOtherUnreadNotificationsR());
  };
  useEffect(() => {
    _getAllInboxData();
    setIsReadMoreInboxNoti(true);
    setCurrentPageInboxNoti(1);
    setIsReadMoreOtherNoti(true);
    setCurrentPageOtherNoti(1);
  }, [focused]);

  // on page number change update all inbox unread
  useEffect(() => {
    notificationsService
      .getAllinboxNotifications(currentPageInboxNoti)
      .then(async (res) => {
        if (res.length > 0) {
          await dispatch(
            addAllInboxNotifications([...allInboxNotificationsData, ...res])
          );
        } else {
          setIsReadMoreInboxNoti(false);
        }
      });
  }, [currentPageInboxNoti]);

  // on page change all other unread
  useEffect(() => {
    notificationsService
      .getAlliOthersNotifications(currentPageOtherNoti)
      .then(async (res) => {
        if (res.length > 0) {
          await dispatch(
            addAllOtherNotifications([...allOthersNotificationsData, ...res])
          );
        } else {
          setIsReadMoreOtherNoti(false);
        }
      });
  }, [currentPageOtherNoti]);
  /*eslint-enable */

  const pagerRef = useRef<any>();
  const [currentPage, setCurrentPage] = useState(0);
  const onPageScroll = (event: any) => {
    const { position } = event.nativeEvent;
    if (position !== currentPage) {
      setCurrentPage(position);
    }
  };

  const PreviousNotification = () => {
    return (
      <View style={styles.previousNotificationContainer}>
        <View style={styles.blackLine} />
        <View style={styles.headerContainer}>
          <Text style={styles.prevHeaderText}>Previous Notifications</Text>
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
                {isReadMoreInboxNoti && allInboxNotificationsData.length > 0 ? (
                  <Pressable
                    onPress={() => {
                      setCurrentPageInboxNoti(currentPageInboxNoti + 1);
                    }}
                    style={styles.readMoreContainer}
                  >
                    <Text style={styles.readMoreText}>Read More</Text>
                  </Pressable>
                ) : null}
              </>
            );
          }}
        />
      </View>
    );
  };

  const OtherNotification = () => {
    logNow('others');
    return (
      <View style={styles.previousNotificationContainer}>
        <FlatList
          style={{ flexGrow: 1, marginTop: heightToDp(2) }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allOthersNotificationsData}
          renderItem={OtherNotificationItem}
          ListFooterComponent={() => {
            return (
              <>
                {isReadMoreOtherNoti &&
                allOthersNotificationsData.length > 0 ? (
                  <Pressable
                    onPress={() => {
                      setCurrentPageOtherNoti(currentPageOtherNoti + 1);
                    }}
                    style={styles.readMoreContainer}
                  >
                    <Text style={styles.readMoreText}>Read More</Text>
                  </Pressable>
                ) : null}
              </>
            );
          }}
        />
        <View style={styles.blackLine} />
        <View style={styles.headerContainer}>
          <Text style={styles.prevHeaderText}>Previous Notifications</Text>
        </View>
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allOthersUnreadNotificationsData}
          renderItem={PreviousNotificationItem}
        />
      </View>
    );
  };

  return (
    <>
      <TitleWithSearchBarLayout title={'Inbox'}>
        <View style={styles.container}>
          <View
            style={{ height: heightToDp(200), paddingBottom: heightToDp(20) }}
          >
            <View style={styles.tabNameContainer}>
              <Pressable
                onPress={() => pagerRef.current.setPage(0)}
                style={[
                  styles.tab,
                  currentPage == 0 ? { borderBottomWidth: 3 } : {},
                ]}
              >
                <Text style={styles.tabText}>
                  Inbox ({allInboxNotificationsData.length})
                </Text>
              </Pressable>
              <Pressable
                onPress={() => pagerRef.current.setPage(1)}
                style={[
                  styles.tab,
                  currentPage == 1 ? { borderBottomWidth: 3 } : {},
                ]}
              >
                <Text style={styles.tabText}>
                  Other ({allOthersNotificationsData.length})
                </Text>
              </Pressable>
            </View>
            <PagerView
              ref={pagerRef}
              onPageScroll={onPageScroll}
              style={styles.pagerView}
              initialPage={0}
            >
              <View key="0">
                <PreviousNotification />
              </View>
              <View key="1">
                <OtherNotification />
              </View>
            </PagerView>
          </View>
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
}
