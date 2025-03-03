import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';



interface CardProps {
    Key: string;
    DayName: string;
    Img: string;
    Condition: string;
    SunRise: string;
    SunSet: string;
    MaxT: number;
    MinT: number;
    navigation: any;
}

function DailyCard({ Key, DayName, Img, Condition, SunRise, SunSet, MaxT, MinT,navigation }: CardProps) {

    return (
        <Pressable 
        style={{
            width: "30%",
            backgroundColor:"#backgroundColor: rgba(255, 255, 255, 0.2)",
            margin: 5,
            padding: 5,
            borderRadius: 10,
        }}   
        key={Key}
        onPress={() => navigation.navigate('Daily')}
        >
            <View style={{margin:5}}>
                <Text>{DayName}</Text>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https:' + Img
                    }}
                />
                <Text>{Condition}</Text>
                <Text>{MaxT}°/{MinT}°C</Text>
                <Text>Sunrise:{SunRise}</Text>
                <Text>Sunset:{SunSet}</Text>
                {/* Add more forecast data as needed */}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({

    tinyLogo: {
        width: 40,
        height: 40,
    },
});

export default DailyCard;