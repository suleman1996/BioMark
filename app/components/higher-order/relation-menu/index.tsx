import { Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { styles } from './styles';

type Props = {
  label: string;
  options: any;
  onChange: any;
  optionValue: any;
};

const RelationMenu = ({ label, options, onChange, optionValue }: Props) => {
  const menuRef = useRef<any>();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(optionValue);
  }, [optionValue]);

  return (
    <View style={styles.main}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Menu
        ref={menuRef}
        onSelect={(value) => {
          setSelected(value);
          onChange(value);
        }}
      >
        <MenuTrigger
          style={styles.input}
          text={options[selected - 1]?.name}
          placeholder="Select"
        >
          <View style={{ position: 'absolute', right: 20 }}>
            <AntDesignIcon name="caretdown" />
          </View>
          <Text>
            {options[selected - 1]?.name ? options[selected - 1]?.name : label}
          </Text>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.popupMenu}>
          {options?.map((item: any, index: number) => (
            <MenuOption key={index} value={item.id} text={item?.name} />
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default RelationMenu;
