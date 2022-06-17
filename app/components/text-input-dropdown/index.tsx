/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Pressable,
} from 'react-native';

import { useTheme } from 'react-native-paper';

import { responsiveFontSize } from 'utils/functions/responsive-text';

import makeStyles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  onChangeText: any;
  value: any;
  disabled: any;
  dropdownData: any;
};

const TextInputDropdown = ({
  onChangeText,
  value,
  disabled,
  dropdownData,
}: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [newValue, setNewValue] = useState(false);
  const [showDropdown, setshowDropdown] = React.useState('');

  return (
    <>
      <Pressable onPress={() => setshowDropdown(!showDropdown)}>
        <View style={styles.inputContainer}>
          <View
            style={styles.dropDownView}

            //   disabled={disabled}
          >
            <Text>{newValue ? newValue : value}</Text>
          </View>
          <View style={styles.downBtn}>
            {showDropdown ? (
              <Entypo
                color={colors.black}
                name="chevron-up"
                size={responsiveFontSize(30)}
              />
            ) : (
              <Entypo
                color={colors.black}
                name="chevron-down"
                size={responsiveFontSize(30)}
              />
            )}
          </View>
        </View>
      </Pressable>

      {showDropdown ? (
        <View style={styles.dropdownOptions}>
          <FlatList
            data={dropdownData}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setNewValue(item.value), setshowDropdown(false);
                      onChangeText(item.value);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.white,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          color: 'black',
                          padding: 10,
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            }}
          />
        </View>
      ) : null}
    </>
  );
};

export default TextInputDropdown;
