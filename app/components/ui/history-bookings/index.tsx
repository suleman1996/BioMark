import ButtonComponent from 'components/base/button';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { makeStyles } from './styles';
import { navigate } from './../../../services/nav-ref';
import SCREENS from 'navigation/constants';
import EmptyResultComponent from 'components/higher-order/empty-result';
import BioBookings from 'components/svg/bio-bookings';
type Props = {};

const HistoryBookings = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const _renderItem = () => {
    return (
      <View style={styles.singleItemContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.whoIsText}>You</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.bookingId}>Booking ID -</Text>
            <Text style={styles.idText}>CVD-FCBTVH</Text>
          </View>
        </View>
        <Text style={styles.locationText}>
          COVID-19 RT-PCR (Urgent) at Kuching General Hospital
        </Text>
        <Text style={styles.cityNameText}>Malaysia, Sarawak</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.dateandtimeText}>20/05/2022 10:30 AM</Text>
          {/* <Text style={styles.cancelledText}>Cancelled</Text> */}

          {/* <View style={styles.confirmedContainer}>
                    <View  style={styles.confirmedDot} />
                    <Text style={styles.confirmedText}>Confirmed</Text>
                  </View> */}
          <View style={styles.readyContainer}>
            <View style={styles.readyDot} />
            <Text style={styles.confirmedText}>Results Ready</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        renderItem={_renderItem}
        data={[]}
        ListFooterComponent={() => (
          <View style={{ paddingTop: heightToDp(20) }} />
        )}
        ListEmptyComponent={() => {
          return (
            <>
              <View style={{ paddingTop: heightToDp(5) }} />
              <EmptyResultComponent
                title="No Recent Bookings"
                subTitle={`This is where you can see your\npast COVID bookings.`}
                icon={<BioBookings width={14} height={14} />}
              />
            </>
          );
        }}
      />
      <View style={styles.buttonContainer}>
        <ButtonComponent
          bg={colors.lightBlue}
          color={colors.black}
          marginTop={1.2}
          onPress={() =>
            navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
              screen: SCREENS.FAQSCREEN,
            })
          }
          title={'FAQ'}
        />
      </View>
    </View>
  );
};

export default HistoryBookings;
