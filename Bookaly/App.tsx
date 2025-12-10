import Navigation from '@navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import ScanStore from '@state/scanStore';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <ScanStore>
        <Navigation />
      </ScanStore>
    </SafeAreaProvider>
  );
};
export default App;
