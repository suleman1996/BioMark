import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import React from 'react';

import { useTheme } from 'react-native-paper';

import Styles from './styles';
import SearIcon from 'react-native-vector-icons/Fontisto';
import Filter from '../../assets/svgs/filter';

type Props = { placeHolder: string; onPress: any };

const Index = (props: Props) => {
  const { colors } = useTheme();

  const styles = Styles(colors);

  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
          style={styles.inputView}
        >
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder={props.placeHolder}
            editable={false}
          />
          <SearIcon style={{ marginRight: 10 }} size={18} name="search" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterView}>
        <TouchableOpacity onPress={props.onPress}>
          <Filter fill={colors.blue} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;
