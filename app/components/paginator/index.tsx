import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'react-native-paper';

export default function Paginator({ selectedIndicator }) {
  const { colors } = useTheme();

  const RenderDots = ({ selected }) => (
    <View
      style={{
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: selected ? colors.selected : colors.unSelected,
        marginRight: 10,
      }}
    />
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      }}
    >
      <RenderDots selected={selectedIndicator?.first} />
      <RenderDots selected={selectedIndicator?.second} />
    </View>
  );
}
