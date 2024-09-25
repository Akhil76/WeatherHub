import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



interface CardProps {
    Img: string;
    Condition:string;
    Temp:number;
    LocalTime:string;
    lastupdate:string;
}

function TempCard({Img,Condition,Temp,LocalTime,lastupdate}: CardProps) {

    return (

        <View style={styles.main}>
            <Image
                style={styles.Logo}
                source={{
                    uri: 'https:' + Img,
                }}
            />
            <Text style={{ fontSize: 20 }}>{Condition}</Text>
            <Text style={{ fontSize: 80 }}>{Temp} &deg;</Text>
            <Text style={{ fontSize: 20 }}>{LocalTime}</Text>
            <Text style={{ fontSize: 20 }}>{lastupdate}</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    main:{
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        margin: 10,
        padding: 5,
        borderRadius: 13
    },
    Logo: {
        width: 190,
        height: 170,
    },
    tinyLogo: {
        width: 40,
        height: 40,
    },

});

export default TempCard;