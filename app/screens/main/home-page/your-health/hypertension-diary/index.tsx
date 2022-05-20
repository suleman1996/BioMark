import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

import { TitleWithBackLayout } from 'components/layouts';

import RenderHealthTrack from 'components/health-tracker-card/index';

import Styles from './styles';
import { useTheme } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
import Pdf from 'assets/svgs/pdf';
import Messenger from 'assets/svgs/messenger';
// import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
const openMessenger = () => {
  Linking.openURL(
    'mailto:support@biomarking.com?subject=SendMail&body=Description'
  );
};

const Index = () => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  //   const navigation = useNavigation();

  const [healthTracker] = React.useState([
    {
      id: 0,
      title: 'Blood Pressure',
      value: '124/65',
      subTitle: 'mmHg',
      color: colors.lightYellow,
    },
    {
      id: 1,
      title: 'Medication',
      value: '-',
      subTitle: 'Add',
      color: colors.blue,
    },
    {
      id: 2,
      title: 'Weight',
      value: '56',
      subTitle: 'kg',
      color: colors.blue,
    },
  ]);

  const PdfLink = ({ title, svg, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.recordKeepingView,
        { backgroundColor: colors.white, paddingHorizontal: 10 },
      ]}
    >
      <View style={{ width: '80%' }}>
        <Text style={styles.recordKeepinText}>{title}</Text>
      </View>

      <View style={{ width: '20%', alignItems: 'center' }}>{svg}</View>
    </TouchableOpacity>
  );
  return (
    <TitleWithBackLayout isGradient={true} title="Hypertension Support Center">
      <View style={styles.containerBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            YOUR HYPERTENSION DAIRY
          </Text>
          <FlatList
            style={{ alignSelf: 'center' }}
            data={healthTracker}
            renderItem={(item) => <RenderHealthTrack item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={[styles.headingText, { marginVertical: 10 }]}>
            HYPERTENSION EDUCATION
          </Text>
          <View>
            <Text>Vedio player</Text>
          </View>
          <PdfLink
            title="What Do I Need To Know About Hypertension"
            // svg={<BP fill={colors.primary} />}
            svg={<Pdf />}
          />
          <PdfLink title="What Do I Check My Blood Pressure" svg={<Pdf />} />
          <PdfLink
            title="Shaking The Salt To Manage My Blood Pressure"
            svg={<Pdf />}
          />
          <PdfLink
            title="Modify My Lifestyle Can Help Control My Blood Presure"
            svg={<Pdf />}
          />
          <PdfLink
            title="Tips on Accurately Measuring Your Blood Pressure At Home"
            svg={<Pdf />}
          />
          <View style={styles.bottomTextView}>
            <Text style={[styles.bottomText, { color: colors.heading }]}>
              Tap to{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.bottomText,
                  { color: colors.blue, textDecorationLine: 'underline' },
                ]}
              >
                Withdraw from Program
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableWithoutFeedback onPress={() => openMessenger()}>
          <View style={styles.messengerView}>
            <Messenger />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TitleWithBackLayout>
  );
};

export default Index;
