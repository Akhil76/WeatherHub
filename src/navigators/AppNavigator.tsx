import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';





const Stack = createNativeStackNavigator();
function AppNavigator (){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  );
}


export default AppNavigator;