import React from 'react';
import { Text, View,StyleSheet } from 'react-native';


function Themes() {

  return (
    <View style={{ height: "100%" }}>
      <Text>Themes Settings</Text>
      <Text>This app is still under developing.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  img_area: {
      marginTop: 100,
      marginBottom: 100,
      borderRadius: 100,
    },
  img:{
    width: 200,
     height: 200, 
     alignSelf: "center",
     borderRadius: 100,
  }
  });

export default Themes;