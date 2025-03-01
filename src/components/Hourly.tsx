import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiKey } from '../OpenApiKey';


interface Props {
    Title: string;
    dateData: string;
    loc:string|null;
}
function Hourly({ Title,loc, dateData }: Props) {
   
    var [data, setData] = useState(Object);
    useEffect(() => {
        // Retrieve data from AsyncStorage

        // Weather api call and data fetch
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${loc}&days=1&aqi=no&alerts=no`)
            .then(res => res.json())
            .then(res => setData(res))
            //.then(res => console.log(res))
            .catch(err => console.log(err))

    },);



    return (
        <View style={styles.forecast_area}>
            <Text style={{ margin: 10 }}>{Title}</Text>
            <View style={styles.daily_forecast}>
                {data && data.forecast && data.forecast.forecastday ? (
                    data.forecast.forecastday[0].hour.map((item: any) => {
                        const ep_date = new Date(Number(item.time_epoch));
                        const Time = ep_date.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
                        return (
                            <View style={{
                                margin: 10,
                                width: "25%",
                            }}
                                key={item.time}
                            >
                                <Text>{Time}</Text>
                                <Text>{item.time}</Text>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: 'https:' + item.condition.icon
                                    }}
                                />
                                <Text>{item.condition.text}</Text>
                                <Text>{item.temp_c}°</Text>

                            </View>
                        )
                    })
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({


    forecast_area: {
        backgroundColor: "#e6ffcc",
        margin: 10,
        borderRadius: 13
    },
    daily_forecast: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",

    },
    tinyLogo: {
        width: 50,
        height: 50,
    },

});
export default Hourly;