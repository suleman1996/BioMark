import React from 'react';
import { View, Text, Image, useWindowDimensions } from 'react-native';
import { styles } from './styles';
import colors from 'assets/colors';

const OnboardingItem = ({ item, index }) => {
  const { width } = useWindowDimensions();
  const RenderDots = ({ itemDot }) => (
    <View
      style={{
        backgroundColor: index == itemDot ? colors.blue : '#DAE0EB',
        height: 12,
        width: 12,
        borderRadius: 7.5,
        marginRight: 10,
      }}
    />
  );
  return (
    <View style={[styles.OIcontainer, { width }]}>
      <View style={styles.cards}>
        <Image source={item.image} />
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <RenderDots itemDot={0} />
          <RenderDots itemDot={1} />
          <RenderDots itemDot={2} />
        </View>
      </View>
    </View>
  );
};

export default OnboardingItem;
