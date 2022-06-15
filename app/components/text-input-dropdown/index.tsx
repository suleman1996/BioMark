/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';

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
  const [dropdown, setDropdown] = useState([
    {
      value: 'hello',
    },
    {
      value: 'hello 2',
    },
    {
      value: 'hello 33',
    },
  ]);

  return (
    <>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.dropDownView}
          onPress={() => setshowDropdown([])}
          //   disabled={disabled}
        >
          <Text>{newValue}</Text>
        </TouchableOpacity>
        <View style={styles.downBtn}>
          {showDropdown ? (
            <TouchableOpacity onPress={() => setshowDropdown(false)}>
              <Entypo
                color={colors.black}
                name="chevron-up"
                size={responsiveFontSize(30)}
              />
            </TouchableOpacity>
          ) : (
            <Entypo
              color={colors.black}
              name="chevron-down"
              size={responsiveFontSize(30)}
            />
          )}
        </View>
      </View>

      {showDropdown ? (
        <View style={styles.dropdownOptions}>
          <FlatList
            data={dropdown}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setNewValue(item.value), setshowDropdown(false);
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
