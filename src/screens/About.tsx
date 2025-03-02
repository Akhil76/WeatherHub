import React from 'react';
import { Text, View, Pressable } from 'react-native';

function About() {

  return (
    <View style={{ backgroundColor: "#ccccff", height: "100%" }}>
      <View>
        <Pressable >
          <Text
            style={{
              fontSize: 20,
              backgroundColor: "#00bfff",
              height: 60,
              padding: 15
            }}
          >About</Text>
        </Pressable>
      </View>
    </View>
  );
}


export default About;