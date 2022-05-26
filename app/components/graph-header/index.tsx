import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import fonts from 'assets/fonts';

type Props = { data: array; setSelectedValue: any; selectedValue: any };

const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);

  const RenderTitle = ({ title }) => (
    <TouchableOpacity onPress={() => props.setSelectedValue(title)}>
      <LinearGradient
        style={
          props.selectedValue?.title == title?.title ? styles.selected : null
        }
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        colors={[
          props.selectedValue?.title == title?.title
            ? '#2C6CFC'
            : colors.lightBlue,
          props.selectedValue?.title == title?.title
            ? '#2CBDFC'
            : colors.lightBlue,
        ]}
      >
        <Text
          style={{
            fontFamily: fonts.regular,
            fontSize: 14,
            color:
              props.selectedValue?.title == title?.title
                ? colors.white
                : colors.heading,
          }}
        >
          {props.selectedValue?.title == title?.title
            ? title.complete
            : title?.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.header}>
      {props.data.map((item) => (
        <RenderTitle title={item} />
      ))}
    </View>
  );
};

export default Index;
