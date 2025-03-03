import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';
import About from '../screens/About'; 
import Daily from '../screens/Daily';
import Themes from '../screens/Themes';





const Stack = createNativeStackNavigator();
function AppNavigator (){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Stack.Screen name="Search" component={Search}/>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="About" component={About}/>
      <Stack.Screen name="Daily" component={Daily}/>
      <Stack.Screen name="Themes" component={Themes}/>
    </Stack.Navigator>
  );
}


export default AppNavigator;