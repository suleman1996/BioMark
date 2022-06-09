import React, { useRef } from 'react';
import { View, Text, FlatList, Pressable, Linking } from 'react-native';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';
import EnJson from '../../../i18n/en.json';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp } from 'utils/functions/responsive-dimensions';

type Props = {};

const FaqScreen = (props: Props) => {
  const {} = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const flatListQA = useRef<any>();

  let cards: any = [];
  let questionAns: any = [];
  const pageData: any = EnJson.pages.covid['covid-info'];
  for (let item in pageData) {
    if (item !== 'title' && item !== 'footer') {
      cards.push(pageData[item]);
      for (let i in pageData[item]) {
        if (i !== 'header') {
          questionAns.push(pageData[item][i]);
        }
      }
    }
  }

  // renderquestionsAns

  const renderQuestionAns = ({ item }: any) => {
    const { question, body } = item;
    return (
      <View style={styles.card}>
        <Text style={styles.headerText}>{question}</Text>
        <Text style={styles.answerText}>{body}</Text>
      </View>
    );
  };

  // render Questions
  const renderQuestion = ({ item }: any) => {
    const { question } = item;
    const scrollToElement = () => {
      const index = question.split('.')[0];
      logNow(index);
      flatListQA.current.scrollToIndex({ index: index - 1 });
    };
    return (
      <Pressable
        onPress={() => {
          scrollToElement();
        }}
      >
        <Text style={styles.question}>{question}</Text>
      </Pressable>
    );
  };

  // card rendered
  const renderCard = ({ item }: any) => {
    const { header } = item;
    let items = [];
    for (let i in item) {
      if (item !== 'header') {
        items.push(item[i]);
      }
    }
    return (
      <View style={styles.card}>
        <Text style={styles.headerText}>{header}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          renderItem={renderQuestion}
          data={items}
        />
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={renderCard}
                data={cards}
                nestedScrollEnabled
              />
            );
          }}
          ref={flatListQA}
          nestedScrollEnabled
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderQuestionAns}
          data={questionAns}
          ListFooterComponent={() => {
            return (
              <>
                <View style={styles.card}>
                  <Text style={styles.headerText}>
                    {`Do you have further questions? \nWrite in to us at`}
                  </Text>
                  <Pressable
                    onPress={() =>
                      Linking.openURL('mailto:support@biomarking.com')
                    }
                  >
                    <Text style={styles.emailText}>
                      {`support@biomarking.com!`}
                    </Text>
                  </Pressable>
                </View>
                <View style={{ paddingBottom: heightToDp(2) }} />
              </>
            );
          }}
        />
        <View style={styles.fab}></View>
      </View>
    </>
  );
};

export default FaqScreen;
