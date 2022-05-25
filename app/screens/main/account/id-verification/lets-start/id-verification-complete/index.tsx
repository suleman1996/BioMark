import { Image, Pressable, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import React from 'react';
import Styles from './styles';

import { SafeAreaView } from 'react-native-safe-area-context';
import Images from 'assets/images';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import ButtonComponent from 'components/base/button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { goBack } from 'services/nav-ref';

type Props = {};

const IdVerfiicationComplete = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const {} = props;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => goBack()} style={styles.backBtnContainer}>
          <Ionicons
            size={responsiveFontSize(40)}
            name="chevron-back-sharp"
            color={colors.darkPrimary}
          />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.text1}>Complete</Text>
        <Text style={styles.text2}>
          Your details have been verified successfully!
        </Text>
        <Image source={Images.bioverificationcomplete} style={styles.image} />
        <View style={{ marginTop: heightToDp(6) }} />
      </SafeAreaView>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <ButtonComponent onPress={undefined} title={'Continue'} />
      </View>
    </>
  );
};

export default IdVerfiicationComplete;
