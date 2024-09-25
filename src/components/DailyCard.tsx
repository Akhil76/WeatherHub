import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';



interface CardProps {
    Key: string;
    DayName: string;
    Img: string;
    Condition: string;
    SunRise: string;
    SunSet: string;
    MaxT: number;
    MinT: number;
}

function DailyCard({ Key, DayName, Img, Condition, SunRise, SunSet, MaxT, MinT }: CardProps) {

    return (
        <View style={{
            width: "30%",
            backgroundColor:"#backgroundColor: rgba(255, 255, 255, 0.2)",
            margin: 5,
            padding: 5,
            borderRadius: 10,
        }}
            key={Key}
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
        </View>
    );
}

const styles = StyleSheet.create({

    tinyLogo: {
        width: 40,
        height: 40,
    },
});

export default DailyCard;