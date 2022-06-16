import { View } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';
import LabResultProgressBar from 'components/lab-result-pregress-bar/index';
import { SmallButton } from 'components/button';
const RendreLabResult = ({ item, setVisible, stepIndicatorIcons }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <View style={styles.resultStatusView}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.resultStatus}>Your Lab Result Status</Text>
          <Text style={[styles.barcode]}>Barcode {item?.lab_ref_id}</Text>
        </View>
        <LabResultProgressBar
          currentPosition={5 - item?.status_order}
          icons={stepIndicatorIcons}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.resultStatus}>{item?.status_name}</Text>
          <Text style={[styles.barcode]}>{item?.status_message}</Text>
        </View>
        {item?.result_status === 'verified' ? (
          <View
            style={{
              width: '40%',
              alignSelf: 'center',
              paddingVertical: 10,
            }}
          >
            <SmallButton
              title="See Results"
              style={{ height: 45 }}
              onPress={() => setVisible(true)}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};
export default RendreLabResult;
