import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import { useRoute } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Hourly from '../components/Hourly';
import DailyCard from '../components/DailyCard';
import HourlyCard from '../components/HourlyCard';

function Home({ navigation }: { navigation: any }) {

    var [data, setData] = useState(Object);
    const [location, setLocation] = useState<string | null>(null);

    useEffect(() => {
        // Retrieve data from AsyncStorage
        AsyncStorage.getItem('locationName')
            .then((result) => {
                setLocation(result);
            })
            .catch((error) => {
                console.log('Error retrieving location:', error);
            });
        // Weather api call and data fetch
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${location}&days=3&aqi=no&alerts=no`)
            .then(res => res.json())
            .then(res => setData(res))
            //.then(res => console.log(res))
            .catch(err => console.log(err))

    },);


    return (
        <ScrollView style={styles.main_area}>
            <View style={styles.btn_area}>
                <IconButton
                    Name={"search"}
                    Size={35}
                    onPress={() => navigation.navigate('Search')}
                />
                <View>
                    {
                        data.location && (
                            <View >
                                <Text style={{ fontSize: 30 }}>{location}</Text>
                                <Text style={{ fontSize: 15 }}>{data.location['country']}</Text>
                            </View>
                        )
                    }
                </View>
                <IconButton
                    Name={"gear"}
                    Size={35}
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
            <View>
                <View >
                    {
                        data.location && data.current && (
                            <View>
                                <View style={{ alignItems: "center" }}>
                                    <Image
                                        style={styles.Logo}
                                        source={{
                                            uri: 'https:' + data.current['condition']['icon'],
                                        }}
                                    />
                                    <Text style={{ fontSize: 20 }}>{data.current['condition']['text']}</Text>
                                    <Text style={{ fontSize: 80 }}>{data.current['temp_c']} &deg;</Text>
                                    <Text style={{ fontSize: 20 }}>{data.location['localtime']}</Text>
                                    <Text style={{ fontSize: 20 }}>{data.location['localtime_epoch']}</Text>
                                </View>
                                <View style={styles.weather_widget}>
                                    <View
                                        style={{
                                            width: "48%",
                                            backgroundColor: "#7CFC00",
                                            padding: 5,
                                            margin: 3,
                                            borderRadius: 7
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>Humdity</Text>
                                        <Text style={{ fontSize: 40 }}>{data.current['humidity']}%</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "48%",
                                            backgroundColor: "#7CFC00",
                                            padding: 5,
                                            margin: 3,
                                            borderRadius: 7
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>Feels like</Text>
                                        <Text style={{ fontSize: 40 }}>{data.current['feelslike_c']}&deg;C</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "48%",
                                            backgroundColor: "#7CFC00",
                                            padding: 5,
                                            margin: 3,
                                            borderRadius: 7
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>Wind</Text>
                                        <Text style={{ fontSize: 50 }}>{data.current['wind_kph']}</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "48%",
                                            backgroundColor: "#7CFC00",
                                            padding: 5,
                                            margin: 3,
                                            borderRadius: 7
                                        }}
                                    >
                                        <Text style={{ fontSize: 20 }}>Cloud</Text>
                                        <Text style={{ fontSize: 50 }}>{data.current['cloud']}%</Text>
                                    </View>
                                </View>
                            </View>
                        )}
                </View>
                <View style={styles.forecast_area}>
                    <Text style={{ margin: 10 }}>Daily forcast</Text>
                    <View style={styles.daily_forecast}>
                        {data.forecast && data.forecast.forecastday.map((day: { date: string; astro: { sunrise: string; sunset: string }; day: { maxtemp_c: string; mintemp_c: string, condition: { text: string, icon: string } }; }) => {

                            let date = new Date(day.date);
                            let options: Intl.DateTimeFormatOptions = { weekday: 'long' };
                            let dayname = date.toLocaleDateString('en-US', options);
                            let max_t = parseInt(day.day.maxtemp_c);
                            let min_t = parseInt(day.day.mintemp_c);
                            return (
                                <DailyCard
                                    Key={day.date}
                                    DayName={dayname}
                                    Img={day.day.condition.icon}
                                    Condition={day.day.condition.text}
                                    MaxT={max_t}
                                    MinT={min_t}
                                    SunRise={day.astro.sunrise}
                                    SunSet={day.astro.sunset}
                                />
                            )
                        })}
                    </View>
                </View>
                <View style={styles.forecast_area}>
                    <Text style={{ margin: 10 }}>Hourly Forecast</Text>
                    <ScrollView horizontal={true} style={{ marginLeft: 5, marginRight: 10, marginBottom:5 }}>
                        {data && data.location && data.forecast && data.forecast.forecastday ? (
                            data.forecast.forecastday[0].hour
                                .filter((item:any) => {
                                    // Calculate the current time
                                    const now = new Date();
                                    const currentHour = now.getHours();
                                    const currentMinute = now.getMinutes();

                                    // Parse the time from the item
                                    const date = new Date(item.time_epoch * 1000);
                                    const hour = date.getHours();
                                    const minute = date.getMinutes();

                                    // Filter and only display data for times greater than or equal to the current time
                                    return hour >= currentHour || (hour === currentHour && minute >= currentMinute);
                                })
                                .map((item:any) => {
                                    const date = new Date(item.time_epoch * 1000);
                                    const hour = date.getHours();
                                    const minute = date.getMinutes();
                                    return (
                                        <HourlyCard
                                            Key={item.time}
                                            Hour={hour}
                                            Minute={minute}
                                            Img={item.condition.icon}
                                            Rain={item.chance_of_rain}
                                            Temp={item.temp_c}
                                        />
                                    );
                                })
                        ) : (
                            <Text style={{ margin: 100 }}>Loading...</Text>
                        )}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
}



const styles = StyleSheet.create({
    main_area: {
        backgroundColor: "#cce6ff",
        height: "100%"
    },
    btn_area: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10
    },
    weather_widget: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#e6ffcc",
        margin: 10,
        padding: 5,
        borderRadius: 13
    },
    forecast_area: {
        backgroundColor: "#e6ffcc",
        margin: 10,
        borderRadius: 13
    },
    daily_forecast: {
        display: "flex",
        justifyContent: "flex-start",

        flexDirection: "row",

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    Logo: {
        width: 190,
        height: 170,
    }
});

export default Home;