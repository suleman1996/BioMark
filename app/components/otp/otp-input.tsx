import React from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import colors from 'assets/colors';

import { styles } from './styles';

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
