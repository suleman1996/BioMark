import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';

import Styles from './styles';
import { useTheme } from 'react-native-paper';
import Close from '../../assets/svgs/close';
import GradientButton from 'components/linear-gradient-button';
import { useTranslation } from 'react-i18next';

const Index = ({
  visible = false,
  setIsVisible,
  option1,
  option2,
  filterOption1,
  filterOption2,
  values,
  onApplyPress,
  filterModalClose,
}) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = Styles(colors);
  const [selectedfilterOption1, setSelectedfilterOption1] = React.useState();
  const [selectedfilterOption2, setSelectedfilterOption2] = React.useState();

  React.useEffect(() => {
    if (values?.selectedfilterOption1)
      setSelectedfilterOption1(values.selectedfilterOption1);
    if (values?.selectedfilterOption2)
      setSelectedfilterOption2(values.selectedfilterOption2);
  }, [values]);

  const RenderRadio = ({ item, onPress, selectedfilterOption }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
    >
      <View
        style={[
          styles.radio,
          {
            borderColor:
              selectedfilterOption?.title == item?.title
                ? colors.heading
                : colors.lightGrey,
          },
        ]}
      >
        {selectedfilterOption?.title == item?.title && (
          <View style={styles.innerRadio} />
        )}
      </View>
      <Text>{item?.title}</Text>
    </TouchableOpacity>
  );

  if (!visible) {
    return null;
  }
  return (
    <Pressable style={styles.overLay} onPress={filterModalClose}>
      <View style={styles.filterView}>
        <View style={styles.header}>
          <Text style={styles.headingText}>
            {t('pages.weightTab.filters.title')}
          </Text>
          <TouchableOpacity onPress={() => setIsVisible(!visible)}>
            <Close />
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeading}>{option1}</Text>
        {filterOption1?.map((item) => (
          <RenderRadio
            onPress={() => setSelectedfilterOption1(item)}
            selectedfilterOption={selectedfilterOption1}
            item={item}
          />
        ))}

        <Text style={styles.subHeading}>{option2}</Text>
        {filterOption2?.map((item) => (
          <RenderRadio
            onPress={() => setSelectedfilterOption2(item)}
            selectedfilterOption={selectedfilterOption2}
            item={item}
          />
        ))}
        <GradientButton
          text={t('pages.weightTab.filters.confirm')}
          color={['#2C6CFC', '#2CBDFC']}
          style={{ marginBottom: 5, marginTop: 30 }}
          onPress={() =>
            onApplyPress(selectedfilterOption1, selectedfilterOption2)
          }
        />
      </View>
    </Pressable>
  );
};

export default Index;
