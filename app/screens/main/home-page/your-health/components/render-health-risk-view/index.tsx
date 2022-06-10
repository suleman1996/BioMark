import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import makeStyles from './styles';

const RenderHealthRiskView = ({
  Svg,
  color,
  healthRisks,
  hardCode,
  References,
  FootNotes,
  Calculations,
  id,
  setSelectedHealthRisk,
  setSelectedHardCode,
  setSelectedRef,
  setSelectedFootNotes,
  setselectedCalculations,
  setColorr,
  setId,
  selectedHealthRisk,
}) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSelectedHealthRisk(healthRisks),
            setSelectedHardCode(hardCode),
            setSelectedRef(References);
          setSelectedFootNotes(FootNotes);
          setselectedCalculations(Calculations);
          setColorr(color);
          setId(id);
        }}
        style={[
          styles.renderHealthRisk,
          {
            backgroundColor:
              healthRisks?.name == selectedHealthRisk?.name
                ? colors.lightGrey
                : color,
          },
        ]}
      >
        <Svg />
      </TouchableOpacity>
      <View style={styles.dot} />
    </>
  );
};
export default RenderHealthRiskView;
