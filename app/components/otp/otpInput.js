import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import colors from '../../assets/colors/colors';

export default function otpInput({
  code,
  setCode,
  clearOTP,
  setClearOTP,
  OTPRef,
}) {
  const focused = useIsFocused();

  React.useEffect(() => {
    setCode('');
    setClearOTP(true);
  }, [focused]);

  // const [code, setCode] = React.useState('');
  // const [clearOTP, setClearOTP] = React.useState(false);
  // const OTPRef = useRef(null);

  return (
    <View style={{width: '95%', alignSelf: 'center'}}>
      <OTPInputView
        selectionColor={colors.blue}
        ref={OTPRef}
        pinCount={6}
        code={code}
        clearInputs={clearOTP}
        onCodeChanged={code => {
          setCode(code), setClearOTP(false);
        }}
        autoFocusOnLoad={false}
        codeInputFieldStyle={[styles.codeInputFieldStyle]}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          setClearOTP(false);
          console.log(`Code is ${code}, you are good to go!`);
          setCode(code);
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
