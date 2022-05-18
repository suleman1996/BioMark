import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { TitleWithBackLayout } from 'components/layouts';
import { useTheme } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import { Data } from './list';
import makeStyles from './styles';

const Diabetes = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.flatlistView}>
        <View style={styles.flatlistView2}>
          <Image source={item.image} style={styles.flatlistImage} />
          <Text style={styles.flatlisttext}>{item.title}</Text>
        </View>
        <Text style={styles.flatlisttext2}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView style={{ flex: 1 }}>
        <TitleWithBackLayout>
          <View style={styles.view}>
            <View style={styles.view3}>
              <View style={styles.view2}>
                <Entypo name="drop" size={20} color="lightgreen" />
                <Text style={styles.diabetes}>Diabetes</Text>
              </View>
              <Text style={styles.text}>Low Risk</Text>
            </View>

            <Text style={styles.text2}>3</Text>
            <Text style={styles.text3}>
              A low score means you have a lower than average probability of
              developing prediabetes or type 2 diabetes. People with low score
              may still develop prediabetes or type 2 diabetes.If you develop
              symptoms of diabetes (frequent urination, thirst, unexplained
              weight loss, fatigue or blurred vision),please see your doctor.
            </Text>
          </View>
          <Text style={styles.text4}>Calculation</Text>
          <Text style={styles.text5}>
            This diabetes risk score is based on the Type 2 Diabetes Risk Test
            by the american Diabetes Association for people who have no prior
            history of diabetes or prediabetes.It takes the following factors
            into account.
          </Text>

          <FlatList
            data={Data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />

          <Text style={styles.text6}>Refrences</Text>
          <Text style={styles.text7}>American Diabetes Association</Text>

          <Text style={styles.text6}>Footnotes</Text>
          <Text style={styles.text7}>
            Your diabetes risk scores is only an estimate.Additionally,your risk
            changes over time.Only a blood test can determine a diagnoses.Please
            discuss with your doctor for more information.
          </Text>
        </TitleWithBackLayout>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Diabetes;
