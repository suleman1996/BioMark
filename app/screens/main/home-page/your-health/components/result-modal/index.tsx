import { TouchableOpacity, View, Image, Keyboard } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { Button } from 'components/button';
import makeStyles from './styles';
import fonts from 'assets/fonts';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import QrInputPopup from '../qr-input-popup';
import MyImage from 'assets/images';
import * as Yup from 'yup';
import { InputWithLabel } from 'components/base';
import { userService } from 'services/user-service/user-service';
import { useDispatch } from 'react-redux';
import { getReduxLabResultStatus } from 'store/home/home-actions';
import { showMessage } from 'react-native-flash-message';

const ResultModal = ({
  loading,
  visible,
  setVisible,
  showApiError,
  setLoading,
  setShowApiError,
  authContext,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const handleCode = async ({ qrInput }: any) => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const response = await userService.labStatusVerify({
        result: {
          barcode: qrInput,
          identification_id: authContext?.userData?.ic_number,
        },
      });
      console.log('Her eis the ic phno api ', result.data);

      dispatch(getReduxLabResultStatus());
      if (response?.data?.message === 'Invalid request') {
        setShowApiError(
          'IC or passport number validation is unsucessful. Please check and try again'
        );
      } else {
        setVisible(false);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.error,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  return (
    <TouchableOpacity style={styles.singleMenuItem}>
      <Formik
        initialValues={{
          qrInput: '',
        }}
        onSubmit={(values) => handleCode(values)}
        validationSchema={QRschemma}
      >
        {({ handleChange, handleSubmit, errors, isValid, values }) => (
          <QrInputPopup loading={loading} visible={visible}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={styles.popUpHeader}>
                <Text style={styles.popUpHeading}>
                  {t('pages.dashboard.dialogs.verify.title')}
                </Text>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={MyImage.closeIcon}
                    style={{
                      height: 15,
                      width: 15,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: 17,
                color: '#8493AE',
              }}
            >
              {t('pages.dashboard.dialogs.verify.description')}
            </Text>

            <View style={{ width: '100%' }}>
              <InputWithLabel
                label={t('pages.dashboard.dialogs.verify.label')}
                placeholder={'Enter your IC / Passport number'}
                onChange={handleChange('qrInput')}
                error={
                  errors.qrInput
                    ? errors.qrInput
                    : showApiError
                    ? showApiError
                    : ''
                }
              />
              <View style={{ marginTop: 40 }}>
                <TouchableOpacity>
                  <Button
                    onPress={() => handleSubmit()}
                    title={t('common.verify')}
                    marginHorizontal={0.1}
                    marginVertical={0.1}
                    //   disabled={!isValid && errors}
                    disabled={
                      !isValid || !values.qrInput || !errors ? true : false
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </QrInputPopup>
        )}
      </Formik>
    </TouchableOpacity>
  );
};
export default ResultModal;
const QRschemma = Yup.object({
  qrInput: Yup.string().required(
    "  i18next.t('pages.dashboard.dialogs.verify.errors.required')"
  ),
});
