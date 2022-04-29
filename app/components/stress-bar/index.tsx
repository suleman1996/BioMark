import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';

type Props = { titleText: String; question: Number; setQuestion: Any };

const Index = (props: Props) => {
  const [never, setNever] = React.useState(false);
  const [almostNever, setAlmostNever] = React.useState(false);
  const [someTimes, setSometimes] = React.useState(false);
  const [fairlyOften, setFairlyOftern] = React.useState(false);
  const [veryOftern, setVeryOftern] = React.useState(false);

  React.useEffect(() => {
    props.question == 0 &&
      (setNever(true),
      setAlmostNever(false),
      setSometimes(false),
      setFairlyOftern(false),
      setVeryOftern(false));
    props.question == 1 &&
      (setNever(false),
      setAlmostNever(true),
      setSometimes(false),
      setFairlyOftern(false),
      setVeryOftern(false));
    props.question == 2 &&
      (setNever(false),
      setAlmostNever(false),
      setSometimes(true),
      setFairlyOftern(false),
      setVeryOftern(false));
    props.question == 3 &&
      (setNever(false),
      setAlmostNever(false),
      setSometimes(false),
      setFairlyOftern(true),
      setVeryOftern(false));
    props.question == 4 &&
      (setNever(false),
      setAlmostNever(false),
      setSometimes(false),
      setFairlyOftern(false),
      setVeryOftern(true));
  }, [props.question]);

  return (
    <View>
      <Text style={styles.title}>{props.titleText}</Text>

      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => {
            setNever(true),
              setAlmostNever(false),
              setSometimes(false),
              setFairlyOftern(false),
              setVeryOftern(false);
            props.setQuestion(0);
          }}
          style={styles.selectView}
        >
          <View style={never ? styles.bigDot : styles.smallDot} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNever(false),
              setAlmostNever(true),
              setSometimes(false),
              setFairlyOftern(false),
              setVeryOftern(false);
            props.setQuestion(1);
          }}
          style={styles.selectView}
        >
          <View style={almostNever ? styles.bigDot : styles.smallDot} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNever(false),
              setAlmostNever(false),
              setSometimes(true),
              setFairlyOftern(false),
              setVeryOftern(false);
            props.setQuestion(2);
          }}
          style={styles.selectView}
        >
          <View style={someTimes ? styles.bigDot : styles.smallDot} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNever(false),
              setAlmostNever(false),
              setSometimes(false),
              setFairlyOftern(true),
              setVeryOftern(false);
            props.setQuestion(3);
          }}
          style={styles.selectView}
        >
          <View style={fairlyOften ? styles.bigDot : styles.smallDot} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNever(false),
              setAlmostNever(false),
              setSometimes(false),
              setFairlyOftern(false),
              setVeryOftern(true);
            props.setQuestion(4);
          }}
          style={styles.selectView}
        >
          <View style={veryOftern ? styles.bigDot : styles.smallDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.headingView}>
        <View style={styles.selectView}>
          <Text style={styles.headingText}>Never</Text>
        </View>
        <View style={styles.selectView}>
          <Text style={styles.headingText}>Almost Never</Text>
        </View>
        <View style={styles.selectView}>
          <Text style={styles.headingText}>Sometimes</Text>
        </View>
        <View style={styles.selectView}>
          <Text style={[styles.headingText, { width: '50%' }]}>
            Fairly Often
          </Text>
        </View>
        <View style={styles.selectView}>
          <Text style={styles.headingText}>Very Often</Text>
        </View>
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
