import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
import { Directions } from 'react-native-gesture-handler';



interface CardProps {
    Key:string;
    Hour:number | string;
    Minute:number | string;
    Img:string;
    Rain:number;
    Temp:number;
    
  }

function HourlyCard ({Key,Img,Rain,Temp,Hour,Minute}:CardProps){

  return (
    <View style={{
        flex:1,
        backgroundColor:"#backgroundColor: rgba(255, 255, 255, 0.2)",
        margin: 3,
        padding:5,
        borderRadius:10,
        width:60,
    }}
        key={Key}
    >
        <Text>{Hour}{Minute}</Text>
        <Image
            style={styles.tinyLogo}
            source={{
                uri:'https:'+Img
            }}
        />
        <Text>{Rain}%</Text>
        <Text>{Temp}°c</Text>
    </View>
  );
}

const styles = StyleSheet.create({

    tinyLogo: {
        width: 40,
        height: 40,
    },
});

export default HourlyCard;