import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Styles from './styles';

type Props = { description: any; status: any; question: any };

const DescriptiveBtn = (props: Props) => {
  const { colors } = useTheme();

  const styles = Styles(colors);

  const [showDescription, setShowDescription] = React.useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDescription(!showDescription)}
        style={[
          styles.container,
          {
            backgroundColor:
              props?.status == 'normal' ? colors.greenDark : colors.dangerRed,
          },
        ]}
      >
        <View style={styles.leftView}>
          <Text style={styles.question}>{props?.question}</Text>
        </View>
        <View style={styles.rightView}>
          <AntDesign
            size={16}
            style={{ color: colors.white }}
            name={showDescription ? 'up' : 'down'}
          />
        </View>
      </TouchableOpacity>
      {showDescription && (
        <View
          style={[
            styles.descriptionView,
            {
              backgroundColor:
                props?.status == 'normal'
                  ? colors.greenOpacity
                  : colors.dangerBg,
            },
          ]}
        >
          <Text style={styles.descriptionText}>{props?.description}</Text>
        </View>
      )}
    </>
  );
};

export default DescriptiveBtn;
