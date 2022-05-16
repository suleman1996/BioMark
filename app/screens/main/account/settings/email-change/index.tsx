import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { ActivityIndicator } from 'components';
import { InputWithLabel, Button } from 'components/base';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';

import { goBack } from 'services/nav-ref';
import { logNow } from 'utils/functions/log-binder';
import { GlobalStyles } from 'utils/theme/global-styles';

import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';

import { styles } from './styles';

const EmailChangeScreen = () => {
  const { colors } = useTheme();

  const dispatch = useDispatch();
  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts
  );

  const formikRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userContacts.email_address);

  /*eslint-disable */
  var isInitial = false;

  useEffect(() => {
    if (!isInitial) {
      isInitial = true;
    }
  }, []);
  /*eslint-enable */

  useEffect(() => {
    setEmail(userContacts.email_address);
  }, [userContacts.email_address]);

  useEffect(() => {
    userService
      .getUserContacts()
      .then((res) => {
        dispatch(addUserContactsDetails(res));
      })
      .catch(() => {})
      .finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = () => {
    const { confirmEmail } = formikRef.current.values;
    logNow({ email, confirmEmail });
    setIsLoading(true);
    formikRef.current.submitForm();
    userService
      .saveUserContacts(confirmEmail)
      .then(() => {
        userService
          .getUserContacts()
          .then((res) => {
            logNow(res);
            dispatch(addUserContactsDetails(res));
          })
          .catch(() => {})
          .finally(() => {});
        goBack();
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ActivityIndicator visible={isLoading} />
      <Formik
        innerRef={formikRef}
        initialValues={{
          email,
          confirmEmail: '',
        }}
        onSubmit={(values) => logNow(values)}
        validationSchema={ResetPassSchema}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TitleWithBackWhiteBgLayout title="Email">
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.container}>
                  <InputWithLabel
                    labelFontSize={25}
                    label={'Email Address'}
                    placeholder={'Enter your email address'}
                    value={values.email}
                    onFocus={() => formikRef.current.submitForm()}
                    onChange={handleChange('email')}
                    error={values.email ? errors.email : ''}
                  />
                  <InputWithLabel
                    labelFontSize={25}
                    onFocus={() => formikRef.current.submitForm()}
                    label={'Confirm Email Address'}
                    placeholder={'Enter your email address'}
                    onChange={handleChange('confirmEmail')}
                    value={values.confirmEmail}
                    error={values.confirmEmail ? errors.confirmEmail : ''}
                  />
                </View>
                {/* <ErrorLineFullWidth error={values.email ? errors.email : ''} />
                <ErrorLineFullWidth
                  error={values.confirmEmail ? errors.confirmEmail : ''}
                /> */}
                <View style={GlobalStyles(colors).bottomBtnWithShadow}>
                  <Button
                    onPress={() => {
                      submitForm();
                      handleSubmit();
                    }}
                    title={'Save'}
                    disabled={
                      Object.entries(errors).length === 0
                        ? values.confirmEmail
                          ? false
                          : true
                        : true
                    }
                  />
                </View>
              </ScrollView>
            </TitleWithBackWhiteBgLayout>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EmailChangeScreen;

const ResetPassSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required')
    .lowercase(),
  confirmEmail: Yup.string()
    .email('Invalid email format')
    .required('Required')
    .oneOf([Yup.ref('email'), null], 'Email does not match')
    .required('Confirm email is required')
    .lowercase(),
});
