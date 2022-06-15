/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import Camera from 'assets/svgs/report-scan';
import makeStyles from './styles';
import ReportVerify from 'assets/svgs/report-verify';
import Processing from 'assets/svgs/report-processing';
import ReportView from 'assets/svgs/report-viewing';
import { widthToDp } from 'utils/functions/responsive-dimensions';
type Props = { currentPosition: number; label: boolean; icons: array };
let comp = [<Camera />, <Processing />, <ReportView />, <ReportVerify />];
const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={{ marginVertical: 5 }}>
      <View
        style={{
          width: '100%',
          // borderWidth: 1,
          height: widthToDp(15),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {comp.map((ele, index) => {
          console.log('ele', ele);
          return (
            <>
              {index !== 0 ? (
                <View
                  style={[
                    styles.blueBar,
                    index + 1 === props.currentPosition
                      ? { backgroundColor: colors.primary }
                      : props.currentPosition < index + 1
                      ? { backgroundColor: '#aaaaaa' }
                      : null,
                  ]}
                />
              ) : null}
              <View
                style={[
                  styles.circleView,
                  index + 1 === props.currentPosition
                    ? {
                        borderWidth: 6,
                        backgroundColor: colors.primary,
                        height: widthToDp(11),
                        width: widthToDp(11),
                      }
                    : props.currentPosition < index + 1
                    ? { backgroundColor: '#aaaaaa' }
                    : null,
                ]}
              >
                {ele}
              </View>
            </>
          );
        })}
      </View>
    </View>
  );
};

export default Index;
