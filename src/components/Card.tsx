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
                backgroundColor: "#7CFC00",
                padding: 5,
                margin: 3,
                borderRadius: 7
            }}
        >
            <Text style={{ fontSize: 20 }}>{Name}</Text>
            <Text style={{ fontSize: 40 }}>{Condition}{Symbol}</Text>
        </View>
    );
}


export default Card;