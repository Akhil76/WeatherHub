import React from 'react';
import { Text, View, Image,StyleSheet } from 'react-native';


function About() {

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.img_area}>
        <Image source={require('../img/me.jpg')} style={styles.img}/>
      </View>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}>
        Developed by A.K.Paul
      </Text>
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

export default About;