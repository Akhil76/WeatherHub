import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import { useRoute } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Hourly from '../components/Hourly';


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
                                </View>
                                <View style={styles.weather_widget}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={{ fontSize: 20 }}>Humdity</Text>
                                        <Text style={{ fontSize: 50 }}>{data.current['humidity']}%</Text>
                                    </View>
                                    <View style={{ width: "50%" }}>
                                        <Text style={{ fontSize: 20 }}>Feel like</Text>
                                        <Text style={{ fontSize: 50 }}>{data.current['feelslike_c']}&deg;C</Text>
                                    </View>
                                    <View style={{ width: "50%" }}>
                                        <Text style={{ fontSize: 20 }}>Wind</Text>
                                        <Text style={{ fontSize: 50 }}>{data.current['wind_kph']}</Text>
                                    </View>
                                    <View style={{ width: "50%" }}>
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
                            let max_t = parseInt(day.day.maxtemp_c)
                            let min_t = parseInt(day.day.mintemp_c)
                            return (
                                <View style={{
                                    width: "30%",
                                    backgroundColor:"#7CFC00",
                                    margin: 5,
                                    padding:5,
                                    borderRadius:10,
                                }}
                                    key={day.date}
                                >
                                    <Text>{dayname}</Text>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={{
                                            uri: 'https:' + day.day.condition.icon
                                        }}
                                    />
                                    <Text>{day.day.condition.text}</Text>
                                    <Text>{max_t}°/{min_t}°C</Text>
                                    <Text>Sunrise:{day.astro.sunrise}</Text>
                                    <Text>Sunset:{day.astro.sunset}</Text>
                                    {/* Add more forecast data as needed */}
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={styles.forecast_area}>
                    <Text style={{ margin: 10 }}>Hourly Forecast</Text>
                    <ScrollView horizontal={true}>
                        {data && data.forecast && data.forecast.forecastday ? (
                            data.forecast.forecastday[0].hour.map((item: any) => {


                                const date = new Date(item.time_epoch * 1000);
                                const hour = date.getHours();
                                const minute =  date.getMinutes();
                                return (
                                    <View style={{
                                        flex:1,
                                        backgroundColor:"#7CFC00",
                                        margin: 3,
                                        padding:5,
                                        borderRadius:10,
                                        width:60,
                                    }}
                                        key={item.time}
                                    >
                                       
                                        <Text>{hour}:{minute}</Text>
                                        <Image
                                            style={styles.tinyLogo}
                                            source={{
                                                uri: 'https:' + item.condition.icon
                                            }}
                                        />
                                        <Text>{item.chance_of_rain}%</Text>
                                        <Text>{item.temp_c}°c</Text>
                                    </View>
                                )
                            })
                        ) : (
                            <Text>Loading...</Text>
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
        padding: 15,
        borderRadius: 13
    },
    forecast_area: {
        backgroundColor: "#e6ffcc",
        margin: 10,
        borderRadius: 13
    },
    daily_forecast: {
        display: "flex",
        justifyContent:"flex-start",
      
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
    },
    tinyLogo: {
        width: 40,
        height: 40,
    },
});

export default Home;