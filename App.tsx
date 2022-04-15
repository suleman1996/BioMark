import {
  Center,
  NativeBaseProvider, Text
} from 'native-base';
import React from 'react';


const App = () => {
  return (
    <NativeBaseProvider>
      <Center>
        <Text>Base Project</Text>
      </Center>
    </NativeBaseProvider>
  );
};
export default App;
