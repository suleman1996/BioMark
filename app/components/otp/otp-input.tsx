import { useIsFocused } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from 'assets/colors';

type Props = {
  code: string;
  setCode: any;
  clearOTP: any;
  setClearOTP: any;
  OTPRef: any;
};

export default function ({
  code,
  setCode,
  clearOTP,
  setClearOTP,
  OTPRef,
}: Props) {
  const focused = useIsFocused();

  React.useEffect(() => {
    setCode('');
    setClearOTP(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  return (
    <View style={{ width: '95%', alignSelf: 'center' }}>
      <OTPInputView
        selectionColor={colors.blue}
        ref={OTPRef}
        pinCount={6}
        code={code}
        clearInputs={clearOTP}
        onCodeChanged={(c: string) => {
          setCode(c);
          setClearOTP(false);
        }}
        autoFocusOnLoad={false}
        codeInputFieldStyle={[styles.codeInputFieldStyle]}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(c: string) => {
          setClearOTP(false);
          setCode(c);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  codeInputFieldStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.heading,
    color: colors.black,
  },
});
