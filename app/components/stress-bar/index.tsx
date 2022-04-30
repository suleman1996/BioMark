import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

type Props = { titleText: String; question: Number; setQuestion: Any };

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
      <Text style={styles.title}>{props.titleText}</Text>

      <View style={styles.bar}>
        <RenderDot index={0} />
        <RenderDot index={1} />
        <RenderDot index={2} />
        <RenderDot index={3} />
        <RenderDot index={4} />
      </View>

      <View style={styles.headingView}>
        <RenderStressTitle title="Never" />
        <RenderStressTitle title="Almost Never" />
        <RenderStressTitle title="Sometimes" />
        <RenderStressTitle width="50%" title="Fairly Often" />
        <RenderStressTitle title="Very Often" />
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  title: {
    fontFamily: GlobalFonts.bold,
    fontSize: 14,
    color: GlobalColors.heading,
    marginTop: 20,
  },
  bar: {
    backgroundColor: '#3D3D3D30',
    width: '100%',
    height: 10,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
  },
  smallDot: {
    backgroundColor: GlobalColors.heading,
    height: '100%',
    width: 10,
    borderRadius: 5,
  },
  bigDot: {
    backgroundColor: GlobalColors.heading,
    height: 25,
    width: 25,
    borderRadius: 13,
    top: -8,
  },
  selectView: {
    width: '20%',
    alignItems: 'center',
  },
  headingView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  headingText: {
    fontFamily: GlobalFonts.regular,
    fontSize: 12,
    color: GlobalColors.heading,
  },
});
