import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// import { useTheme } from 'react-native-paper';
import Covid19Home from 'screens/covid19';
import SCREENS from './constants';

const Stack = createNativeStackNavigator();

const Covid19Navigator = () => {
  // const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.COVID19HOME}
        component={Covid19Home}
      />
    </Stack.Navigator>
  );
};

export default Covid19Navigator;
