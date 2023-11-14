import * as React from 'react';
import MyStack from './src/screens/AppStack';
import { NativeBaseProvider } from 'native-base';

function App() {
  return (
  <NativeBaseProvider>
    <MyStack />
  </NativeBaseProvider>
  );
}

export default App;
