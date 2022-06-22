import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import makeStyles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import fonts from 'assets/fonts';
import { useTranslation } from 'react-i18next';

const RenderRecordKeeping = ({ title, id, svg, onPress }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={['#2C6CFC', '#2CBDFC']}
      style={styles.recordKeepingView}
    >
      <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
        {svg}
        <Text style={[styles.recordKeepinText, { marginTop: 10 }]}>
          {title}
        </Text>
        <Text
          style={[
            styles.recordKeepinText,
            { fontSize: 14, fontFamily: fonts.light, marginBottom: 10 },
          ]}
        >
          {t('pages.dashboard.psp.empower')} {id}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
export default RenderRecordKeeping;
