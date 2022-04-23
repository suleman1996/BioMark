import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import TitleWithBackLayout from '../../../../../../components/layouts/back-with-title';
import ButtonWithShadowContainer from '../../../../../../components/base/button-with-shadow-container';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import {navigate} from '../../../../../../services/navRef';
import {Nav_Screens} from '../../../../../../navigation/constants';
import {GlobalColors} from '../../../../../../utils/theme/globalColors';
import colors from '../../../../../../assets/colors/colors';
import fonts from '../../../../../../assets/fonts/fonts';

type Props = {};

const Sleep = (props: Props) => {
  const sleepOptions = [
    // {title: null},
    {title: 'less than 4 hours'},
    {title: '4-7 hours'},
    {title: '7-10 hours'},
    {title: 'more than 10 hours'},
  ];
  const [selectedSleep, setSelectedSleep] = React.useState(
    sleepOptions[0].title,
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackLayout title="Sleep">
        <View style={styles.container}>
          <Text style={styles.heading}>
            How many hours of sleep do you get per day?
          </Text>
          <View>
            <View style={styles.container2}>
              <Picker
                selectedValue={selectedSleep}
                style={{
                  color: colors.placeHolder,
                  fontFamily: fonts.regular,
                }}
                itemStyle={{color: 'red'}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedSleep(itemValue)
                }>
                {sleepOptions?.map((item, index) => {
                  return (
                    <Picker.Item
                      color={selectedSleep == item.title && colors.blue}
                      key={index}
                      label={item.title}
                      value={item.title}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
        </View>
        <ButtonWithShadowContainer
          onPress={() => navigate(Nav_Screens.Edit_Profile)}
          title="Save"
        />
      </TitleWithBackLayout>
    </SafeAreaView>
  );
};

export default Sleep;
