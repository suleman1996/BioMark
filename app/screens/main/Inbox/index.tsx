import { TitleWithSearchBarLayout } from 'components/layouts';
import OtherNotificationItem from 'components/ui/other-notification-item';
import PreviousNotificationItem from 'components/ui/previous-notification-item';
import React, { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { styles } from './styles';

export default function InboxScreen() {
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
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={PreviousNotificationItem}
        />
      </View>
    );
  };

  const OtherNotification = () => {
    return (
      <View style={styles.previousNotificationContainer}>
        <FlatList
          style={{ flexGrow: 1 }}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: widthToDp(86) }}
          keyExtractor={(item, index) => index.toString()}
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          renderItem={OtherNotificationItem}
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
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
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
                <Text style={styles.tabText}>Inbox (10)</Text>
              </Pressable>
              <Pressable
                onPress={() => pagerRef.current.setPage(1)}
                style={[
                  styles.tab,
                  currentPage == 1 ? { borderBottomWidth: 3 } : {},
                ]}
              >
                <Text style={styles.tabText}>Other (10)</Text>
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
