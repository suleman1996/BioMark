import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { TitleWithBackLayout } from 'components/layouts';
import { ButtonWithShadowContainer } from 'components/base';
import styles from './styles';
import { StressBar, ActivityIndicator } from 'components';
import { useIsFocused } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { userService } from 'services/user-service/user-service';
import { goBack } from 'services/nav-ref';

const Index = () => {
  const isFocus = useIsFocused();
  const [question1, setQuestion1] = React.useState(0);
  const [question2, setQuestion2] = React.useState(0);
  const [question3, setQuestion3] = React.useState(0);
  const [question4, setQuestion4] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const getStress = async () => {
    try {
      setIsLoading(true);
      const result = await userService.getStress();
      result?.data?.question1 && setQuestion1(result?.data?.question1);
      result?.data?.question2 && setQuestion2(result?.data?.question2);
      result?.data?.question3 && setQuestion3(result?.data?.question3);
      result?.data?.question4 && setQuestion4(result?.data?.question4);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log('Error stress', error);
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

  const handleCreateStress = async () => {
    try {
      setIsLoading(true);
      const result = await userService.createStress(
        question1,
        question2,
        question3,
        question4
      );
      console.log('here is the create  stress ', result.data);
      goBack();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log('Error stress', error);
      if (error.errMsg.status == '500') {
        showMessage({
          message: 'Internal Server Error',
          type: 'danger',
        });
      } else if (error.errMsg.status == '404') {
        showMessage({
          message: error.errMsg.error,
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

  useEffect(() => {
    getStress();
  }, [isFocus]);

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={isLoading} />
      <TitleWithBackLayout title="Stress">
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <ScrollView>
            <StressBar
              question={question1}
              setQuestion={setQuestion1}
              titleText=" In the last month, how often have you felt that you were unable to controll yhe important things in your life?"
            />
            <StressBar
              question={question2}
              setQuestion={setQuestion2}
              titleText=" In the last month, how often have you felt confident about your ability to handle your personal problems?"
            />
            <StressBar
              question={question3}
              setQuestion={setQuestion3}
              titleText=" In the last month, how often have you felt that hings were going your way?"
            />
            <StressBar
              question={question4}
              setQuestion={setQuestion4}
              titleText=" In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
            />
            <View style={{ height: 130 }} />
          </ScrollView>
        </View>
        <ButtonWithShadowContainer
          onPress={() => handleCreateStress()}
          title="Save"
        />
      </TitleWithBackLayout>
    </View>
  );
};

export default Index;
