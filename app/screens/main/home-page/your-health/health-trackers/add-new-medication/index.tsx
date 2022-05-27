/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

import { TitleWithBackWhiteBgLayout } from 'components/layouts';

import makeStyles from './styles';

const AddNewMedication = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <TitleWithBackWhiteBgLayout
      title="Add New Medication"
      children={undefined}
      style={undefined}
    ></TitleWithBackWhiteBgLayout>
  );
};

export default AddNewMedication;
