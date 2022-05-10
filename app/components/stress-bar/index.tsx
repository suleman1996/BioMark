import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';

type Props = {
  titleText: String;
  question: Number;
  setQuestion: any;
  options: any;
};

const Index = (props: Props) => {
  const [stressValue, setStressValue] = React.useState(0);

  React.useEffect(() => {
    setStressValue(props?.question);
  }, [props.question]);

  const RenderStressTitle = ({ title, width }) => (
    <View style={[styles.selectView]}>
      <Text style={[styles.headingText, { width: width }]}>{title}</Text>
    </View>
  );

  const RenderDot = ({ index }) => (
    <TouchableOpacity
      onPress={() => {
        setStressValue(index);
        props.setQuestion(index);
      }}
      style={styles.selectView}
    >
      <View style={stressValue == index ? styles.bigDot : styles.smallDot} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.title}> {props.titleText}</Text>

      <View style={styles.bar}>
        <RenderDot index={0} />
        <RenderDot index={1} />
        <RenderDot index={2} />
        <RenderDot index={3} />
        <RenderDot index={4} />
      </View>

      <View style={styles.headingView}>
        <RenderStressTitle title={props?.options[0]} />
        <RenderStressTitle title={props?.options[1]} />
        <RenderStressTitle title={props?.options[2]} />
        <RenderStressTitle width="50%" title={props?.options[3]} />
        <RenderStressTitle title={props?.options[4]} />
      </View>
    </View>
  );
};

export default Index;
