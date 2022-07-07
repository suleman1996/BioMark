import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';
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
import { useTranslation } from 'react-i18next';

export default function InboxScreen() {
  const { t } = useTranslation();
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

  const allInsights = useSelector(
    (state: IAppState) => state.notifications.allInsights
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
      await notificationsService.readInboxNotification(id);
      await dispatch(getAllInboxUnreadNotificationsR());
    } catch (err) {
      console.error(err);
    }
  };
  const clickHandler = (notification: NotificationMessage) => {
    switch (notification.notification_type) {
      case NotificationType.medication_reminder:
      case NotificationType.missed_medication:
        navigate(SCREENS.HEALTH_PROGRESS, 1);
        break;
      case NotificationType.medical:
        navigate(SCREENS.ACCOUNT);

        break;
      case NotificationType.result:
      case NotificationType.mcr:
        navigate(SCREENS.HEALTH_RECORD);
        break;
      case NotificationType.message:
        //   this.nav.navigateForward(['notification', 'doctor-message', notification.id]).then();
        break;
      case NotificationType.doctor:
        break;
      case NotificationType.covid:
        navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
          screen: SCREENS.COVID19BOOKINGS,
          params: {
            has_pending_declaration: notification?.has_pending_declaration,
          },
        });
        break;
      case NotificationType.covid_result:
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);

  const PreviousNotification = () => {
    return (
      <View style={styles.previousNotificationContainer}>
        {/* Unread notification for inbox */}
        <FlatList
          scrollEnabled={false}
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

        <View style={[styles.blackLine, { marginTop: heightToDp(2) }]} />

        <View style={styles.headerContainer}>
          <Text style={styles.prevHeaderText}>
            {t('pages.more.links.previousNotifications')}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
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
                    <Text style={styles.readMoreText}>
                      {t('common.showMore')}
                    </Text>
                  </Pressable>
                ) : null}
              </>
            );
          }}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}> {t('common.noMore')}</Text>
          )}
        />
      </View>
    );
  };

  const OtherNotification = () => {
    return (
      <View style={styles.previousNotificationContainer}>
        <FlatList
          style={{ flexGrow: 1, marginTop: heightToDp(2) }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allOthersUnreadNotificationsData}
          renderItem={({ item }) => (
            <OtherNotificationItem
              getIcon={getIcon}
              item={item}
              onPress={() => {
                clickHandler(item);
              }}
            />
          )}
        />
        <View
          style={[
            styles.blackLine,
            {
              marginTop:
                allOthersUnreadNotificationsData.length > 0
                  ? heightToDp(3)
                  : null,
            },
          ]}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.prevHeaderText}>
            {t('pages.more.links.previousNotifications')}
          </Text>
        </View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={allOthersNotificationsData}
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
                {isReadMoreOtherNoti &&
                allOthersNotificationsData.length > 0 ? (
                  <Pressable
                    onPress={() => {
                      setCurrentPageOtherNoti(currentPageOtherNoti + 1);
                    }}
                    style={styles.readMoreContainer}
                  >
                    <Text style={styles.readMoreText}>
                      {t('common.showMore')}
                    </Text>
                  </Pressable>
                ) : null}
              </>
            );
          }}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}> {t('common.noMore')}</Text>
          )}
        />
      </View>
    );
  };

  const Insights = () => {
    return (
      <View style={styles.previousNotificationContainer}>
        <FlatList
          style={{
            flexGrow: 1,
            marginTop: heightToDp(2),
          }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(_, index) => index.toString()}
          data={allInsights}
          renderItem={({ item }) => (
            <OtherNotificationItem
              getIcon={getIcon}
              item={item}
              onPress={() => {}}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              {' '}
              {t('common.noMoreInsights')}
            </Text>
          )}
        />
      </View>
    );
  };

  return (
    <>
      <TitleWithSearchBarLayout title={'Inbox'} scroll={false}>
        <View style={styles.container}>
          <View
            style={{
              height: heightToDp(200),
              //  paddingBottom: heightToDp(20),
            }}
          >
            <View style={styles.tabNameContainer}>
              <Pressable
                // onPress={() => PreviousNotification()}
                onPress={() => {
                  setCurrentPage(0);
                }}
                style={[
                  styles.tab,
                  currentPage == 0 ? { borderBottomWidth: 2 } : {},
                ]}
              >
                <Text style={styles.tabText}>
                  {t('pages.tabController.inbox')} (
                  {allInboxUnreadNotifications.length})
                </Text>
              </Pressable>
              <Pressable
                //  onPress={() => OtherNotification()}
                onPress={() => {
                  setCurrentPage(1);
                }}
                style={[
                  styles.tab,
                  currentPage == 1 ? { borderBottomWidth: 2 } : {},
                ]}
              >
                <Text style={styles.tabText}>
                  {t('pages.tabController.other')} (
                  {allOthersUnreadNotificationsData.length})
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setCurrentPage(2);
                }}
                style={[
                  styles.tab,
                  currentPage == 2 ? { borderBottomWidth: 2 } : {},
                ]}
              >
                <Text style={styles.tabText}>
                  {t('pages.tabController.insights')} ({allInsights.length})
                </Text>
              </Pressable>
            </View>
            <View style={{ height: heightToDp(63) }}>
              <ScrollView>
                <View
                  //ref={pagerRef}
                  //onPageScroll={onPageScroll}
                  style={styles.pagerView}
                  //initialPage={0}
                >
                  {currentPage === 0 && <PreviousNotification />}
                  {currentPage === 1 && <OtherNotification />}
                  {currentPage === 2 && <Insights />}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </TitleWithSearchBarLayout>
    </>
  );
}
