import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigators/AppNavigator';
import Footer from './src/layout/Footer';
import {createNativeStackNavigator} from '@react-navigation/native-stack'



const Stack = createNativeStackNavigator();
function App() {

  return (
    <NavigationContainer>
      <AppNavigator/>
      <Footer/>
    </NavigationContainer>
  );
}


export default App;