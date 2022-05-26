import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import Arrow from 'react-native-vector-icons/AntDesign';
import Styles from './styles';
import { useTheme } from 'react-native-paper';
import fonts from 'assets/fonts';

type Props = { logData: array };

const Index = (props: Props) => {
  const { colors } = useTheme();
  const styles = Styles(colors);
  const [log, setLog] = React.useState(false);

  const RenderLog = ({ item }) => (
    <View style={styles.renderLog}>
      <View style={{ width: '40%' }}>
        <Text
          style={{
            color: item?.color ? item?.color : colors.heading,
            fontFamily: fonts.bold,
          }}
        >
          {item.value}
        </Text>
      </View>
      <View style={{ width: '60%', alignItems: 'flex-end' }}>
        <Text style={{ color: colors.blue, fontSize: 12 }}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setLog(!log)} style={styles.logView}>
        <Text style={{ color: colors.heading }}>Logs</Text>
        <Arrow color={colors.heading} name={log ? 'up' : 'down'} />
      </TouchableOpacity>

      {log && props.logData.map((item) => <RenderLog item={item} />)}
    </View>
  );
};

export default Index;
