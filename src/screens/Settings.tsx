import React from 'react';
import { Text, View, Pressable } from 'react-native';


interface Props {
  navigation: any;
}
function Settings({ navigation}: Props) {

  return (
    <View style={{ backgroundColor: "#ccccff", height: "100%" }}>
      <View>
        <Pressable style={{ backgroundColor: "#00bfff",marginTop:5 }}>
          <Text
            style={{
              fontSize: 20,
              height: 60,
              padding: 15
            }}
          >Farenheit/Celcius</Text>
        </Pressable>
        <Pressable 
        style={{ backgroundColor: "#00bfff",marginTop:5 }}
        onPress={() => navigation.navigate('Themes')}
        >
          <Text
            style={{
              fontSize: 20,
              height: 60,
              padding: 15
            }}
          >Themes</Text>
        </Pressable>
        <Pressable 
        style={{ backgroundColor: "#00bfff",marginTop:5 }}
        onPress={() => navigation.navigate('About')}
        >
          <Text
            style={{
              fontSize: 20,
              height: 60,
              padding: 15
            }}
          >About</Text>
        </Pressable>
      </View>
    </View>
  );
}


export default Settings;