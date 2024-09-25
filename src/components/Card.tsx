import React from 'react';
import { View, Text } from 'react-native';



interface CardProps {
    Name: string;
    Condition: number;
    Symbol:string | null;
}

function Card({ Name,Condition,Symbol }: CardProps) {

    return (
        <View
            style={{
                width: "48%",
                backgroundColor: "#backgroundColor: rgba(255, 255, 255, 0.2)",
                padding: 5,
                margin: 3,
                borderRadius: 7
            }}
        >
            <View style={{margin:5}}>
                <Text style={{ fontSize: 20 }}>{Name}</Text>
                <Text style={{ fontSize: 40 }}>{Condition}{Symbol}</Text>
            </View>
        </View>
    );
}


export default Card;