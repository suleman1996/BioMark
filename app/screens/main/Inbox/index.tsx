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
  getAllInboxUnreadNotificationsR,
} from 'store/notifications/notification-actions';
import { IAppState } from 'store/IAppState';
import { notificationsService } from 'services/notification-service';

import makeStyles from './styles';
import { NotificationMessage, NotificationType } from 'types/api';
import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants/index';

import {
  BioDoctorStethoscope,
  BioTrend,
  BioMedical,
  BioMcr,
} from 'components/svg';
import UnReadInboxNotificationItem from 'components/ui/unread-inbox-notification-item';

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
  const allInboxUnreadNotifications = useSelector(
    (state: IAppState) => state.notifications.allInboxUnreadNotifications
  );

  const [isReadMoreInboxNoti, setIsReadMoreInboxNoti] = useState(true);
  const [currentPageInboxNoti, setCurrentPageInboxNoti] = useState(1);

  const [isReadMoreOtherNoti, setIsReadMoreOtherNoti] = useState(true);
  const [currentPageOtherNoti, setCurrentPageOtherNoti] = useState(1);

  const dispatch = useDispatch();
  const focused = useIsFocused();
  console.log('allInboxUnreadNotifications', allInboxUnreadNotifications);

  /*eslint-disable */
  const _getAllInboxData = async () => {
    await dispatch(getAllInboxNotificationsR(1));
    await dispatch(getAllOtherNotificationsR(1));
    await dispatch(getAllOtherUnreadNotificationsR());
    await dispatch(getAllInboxUnreadNotificationsR());
  };
  useEffect(() => {
    _getAllInboxData();
    setIsReadMoreInboxNoti(true);
    setCurrentPageInboxNoti(1);
    setIsReadMoreOtherNoti(true);
    setCurrentPageOtherNoti(1);
    PreviousNotification();
    OtherNotification();
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
  const readNotification = async (id) => {
    try {
      const result = await notificationsService.readInboxNotification(id);
      console.log('id', id);
      await dispatch(getAllInboxUnreadNotificationsR());
      console.log('result', result.data);
    } catch (err) {
      console.error(err);
    }
  };
  const clickHandler = (notification: NotificationMessage) => {
    console.log(
      'notification?.has_pending_declaration',
      notification?.has_pending_declaration
    );

    switch (notification.notification_type) {
      case NotificationType.medication_reminder:
      case NotificationType.missed_medication:
        console.log('1');
        navigate(SCREENS.HEALTH_PROGRESS, 1);
        break;
      case NotificationType.medical:
        console.log('2');
        navigate(SCREENS.ACCOUNT);

        break;
      case NotificationType.result:
      case NotificationType.mcr:
        console.log('3');
        navigate(SCREENS.HEALTH_RECORD);
        break;
      case NotificationType.message:
        console.log('4');
        //   this.nav.navigateForward(['notification', 'doctor-message', notification.id]).then();
        break;
      case NotificationType.doctor:
        console.log('5');
        console.log('message'); // TODO not sure where to go
        break;
      case NotificationType.covid:
        console.log('6');
        navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
          screen: SCREENS.COVID19BOOKINGS,
          params: {
            has_pending_declaration: notification?.has_pending_declaration,
          },
        });
        break;
      case NotificationType.covid_result:
        console.log('7');
        navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
          screen: SCREENS.COVID19HOME,
        });
        break;
    }
  };
  const getIcon = (type: string) => {
    const typeMap = {
      [NotificationType.medical]: <BioMedical />,
      [NotificationType.medication_reminder]: <BioMedical />,
      [NotificationType.missed_medication]: <BioMedical />,

      [NotificationType.result]: <BioTrend />,

      [NotificationType.doctor]: <BioDoctorStethoscope />,
      [NotificationType.message]: <BioDoctorStethoscope />,

      [NotificationType.mcr]: <BioMcr />,
      [NotificationType.covid]: <BioMedical />,
    };

    return typeMap[type];
  };
  const pagerRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        {/* Unread notification for inbox */}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allInboxUnreadNotifications}
          renderItem={({ item }) => (
            <UnReadInboxNotificationItem
              getIcon={getIcon}
              item={item}
              onPress={() => {
                readNotification(item?.notification_id);
                clickHandler(item);
              }}
            />
          )}
        />

        {allInboxUnreadNotifications.length < 0 ? (
          <View style={styles.blackLine} />
        ) : null}

        <View style={styles.headerContainer}>
          <Text style={styles.prevHeaderText}>Previous Notifications</Text>
        </View>
        <FlatList
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allInboxNotificationsData}
          renderItem={({ item }) => (
            <PreviousNotificationItem
              getIcon={getIcon}
              item={item}
              onPress={() => {
                clickHandler(item);
              }}
            />
          )}
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
    return (
      <View style={styles.previousNotificationContainer}>
        <FlatList
          style={{ flexGrow: 1, marginTop: heightToDp(2) }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allOthersNotificationsData}
          renderItem={({ item }) => (
            <OtherNotificationItem
              getIcon={getIcon}
              item={item}
              onPress={() => clickHandler(item)}
            />
          )}
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
          renderItem={({ item }) => (
            <PreviousNotificationItem getIcon={getIcon} item={item} />
          )}
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
                // onPress={() => PreviousNotification()}
                onPress={() => {
                  pagerRef.current.setPage(0);
                  setCurrentPage(0);
                }}
                style={[
                  styles.tab,
                  currentPage == 0 ? { borderBottomWidth: 3 } : {},
                ]}
              >
                <Text style={styles.tabText}>
                  Inbox ({allInboxUnreadNotifications.length})
                </Text>
              </Pressable>
              <Pressable
                //  onPress={() => OtherNotification()}
                onPress={() => {
                  pagerRef.current.setPage(1);
                  setCurrentPage(1);
                }}
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
              {currentPage === 0 ? (
                <PreviousNotification />
              ) : (
                <OtherNotification />
              )}
            </PagerView>
          </View>
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
}
