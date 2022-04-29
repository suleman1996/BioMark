import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { heightToDp, widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalStyles } from 'utils/theme/global-styles';

type Props = {
  options: any;
  label: string;
  value: number | string;
  onChange: any;
  isTitleSelect?: boolean;
};

const BoxSelector = ({
  options,
  label,
  value,
  onChange,
  isTitleSelect,
}: Props) => {
  const selectedStyles = { backgroundColor: GlobalColors.primary };
  const selectedTextStyle = { color: GlobalColors.white };

  if (isTitleSelect) {
    return (
      <View style={styles.main}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <FlatList
          style={styles.container}
          horizontal
          data={options}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onChange(item.title)}
              key={index}
              style={[styles.button, value == item.title ? selectedStyles : {}]}
            >
              <Text style={[value == item.title ? selectedTextStyle : {}]}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <FlatList
          style={styles.container}
          horizontal
          data={options}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => onChange(item.id)}
              key={index}
              style={[styles.button, value == item.id ? selectedStyles : {}]}
            >
              <Text style={[value == item.id ? selectedTextStyle : {}]}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />
      </View>
    );
  }
};

export default BoxSelector;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: heightToDp(2),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: widthToDp(25),
    marginRight: widthToDp(3),
    borderRadius: widthToDp(2),
    height: heightToDp(5.5),
    ...GlobalStyles.shadow,
  },
  label: {
    fontSize: responsiveFontSize(22),
    color: GlobalColors.darkPrimary,
    fontFamily: GlobalFonts.medium,
  },
});
