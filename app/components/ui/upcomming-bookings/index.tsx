import ButtonComponent from 'components/base/button';
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { navigate } from 'services/nav-ref';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import SuggestionsText from '../suggestions-text';
import { makeStyles } from './styles';
import SCREENS from 'navigation/constants';
type Props = {};

const UpcommingBookings = (props: Props) => {
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.dateandtimeText}>Friday,20/05/2022 10:30 AM</Text>
          <MaterialCommunityIcons
            name="barcode-scan"
            color={colors.darkPrimary}
            size={responsiveFontSize(20)}
          />
        </View>
        <Text style={styles.cityNameText}>Malaysia, Sarawak</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: heightToDp(1),
          }}
        >
          <Pressable style={styles.button}>
            <Text style={styles.dateandtimeText}>Health Declaration</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: colors.fieldGrey }]}
          >
            <Text style={[styles.dateandtimeText, { color: colors.darkGray }]}>
              Cancel Test
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={() => <SuggestionsText />}
        renderItem={_renderItem}
        data={[1, 2, 3]}
        ListFooterComponent={() => (
          <View style={{ paddingTop: heightToDp(20) }} />
        )}
      />
      <View style={styles.buttonContainer}>
        <ButtonComponent onPress={undefined} title={'Book New COVID-19 Test'} />
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

export default UpcommingBookings;
