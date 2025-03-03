import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, Text, Image, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Hourly from '../components/Hourly';
import Card from '../components/Card';
import DailyCard from '../components/DailyCard';
import HourlyCard from '../components/HourlyCard';
import Header from '../layout/Header';
import TempCard from '../components/TempCard';
import { useRoute } from '@react-navigation/native';





interface Props {
    navigation: any;
}

function Home({ navigation }: Props) {
    var [data, setData] = useState(Object);
    var [localData, setLocalData] = useState(Object);
    const [location, setLocation] = useState<string | null>("Dhaka");
    const [refreshing, setRefreshing] = useState(false);
    const city = useRoute();
    //console.log(city.params);
    // console.log(localData);
    //console.log(location);

    const fetchLocation = async () => {
        const savedLocation = await AsyncStorage.getItem('locationName');
        setLocation(savedLocation);
    };



    const fetchData = async () => {

        try {
            const results = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${location}&days=7&aqi=no&alerts=no`);
            const weatherData = await results.json();
            setData(weatherData);
            await AsyncStorage.setItem('weatherData', JSON.stringify(weatherData));
            //console.log('Weather data saved to local storage.');
            //const savedData = await AsyncStorage.getItem('weatherData');
            // if (savedData !== null && weatherData == null) {
            //     const parsedData = JSON.parse(savedData);
            //     setData(parsedData);
            //     console.log('Loaded weather data from local storage.');
            // }
            //console.log(savedData)
        } catch (error) {
            console.log(error);
        }
    };
    const fetchSavedData = async () => {
        const savedData = await AsyncStorage.getItem('weatherData');
        if (savedData !== null) {
            const parsedData = JSON.parse(savedData);
            setLocalData(parsedData);
            console.log('Loaded weather data from local storage.');
        }
        console.log("Getting saved data.");
    }
    useEffect(() => {

        fetchLocation();
        fetchData();
        fetchSavedData();
        //loadSavedWeatherData();
        //setRefreshing(false);
    }, [location, city.params]);

    const onRefresh = useCallback(() => {
        fetchLocation();
        fetchData();
        fetchSavedData()
        console.log('Refreshing...'); // Add this line for debugging  
    }, [location, city.params]);
    // Function to get relative time
    const getRelativeTime = (lastUpdated: string) => {
        const lastUpdateDate = new Date(lastUpdated);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - lastUpdateDate.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        } else {
            return `${Math.floor(diffInSeconds / 86400)} days ago`;
        }
    };


    return (
        <FlatList
            data={[data]}
            renderItem={({ item }) => (
                <View style={styles.main_area}>
                    {data.location && (
                        <Header
                            Location={data.location['name']}
                            Country={data.location['country']}
                            navigation={navigation}
                        />
                    )}
                    <View>
                        <View>
                            {/* <View>
                                <Text>City:{location}</Text>
                            </View>  */}
                            {

                                data.location && data.current && (

                                    <View>
                                        <TempCard
                                            Img={data.current['condition']['icon']}
                                            Condition={data.current['condition']['text']}
                                            Temp={parseInt(data.current['temp_c'])} // Convert string to int number
                                            lastupdate={getRelativeTime(data.current.last_updated)}
                                            LocalTime={""}
                                        />
                                        <View style={styles.weather_widget}>
                                            <Card Name="Feels like" Condition={parseInt(data.current['feelslike_c'])} Symbol={"°c"} />
                                            <Card Name="Humdity" Condition={data.current['humidity']} Symbol={"%"} />
                                            <Card Name="Wind" Condition={parseInt(data.current['wind_kph'])} Symbol={""} />
                                            <Card Name="Cloud" Condition={data.current['cloud']} Symbol={"%"} />
                                        </View>

                                    </View>
                                )
                            }
                        </View>
                        <View style={styles.forecast_area}>
                            <Text style={{ margin: 10, color: "#00ff00", fontWeight: "bold" }}>Daily forcast</Text>
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
                                            navigation={navigation}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                        <View style={styles.forecast_area}>
                            <Text style={{ margin: 10, color: "#00ff00", fontWeight: "bold" }}>Hourly Forecast</Text>
                            <ScrollView horizontal={true} style={{ marginLeft: 5, marginRight: 10, marginBottom: 5 }}>
                                {data && data.location && data.forecast && data.forecast.forecastday ? (
                                    [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour].map((item: any, index: any) => {
                                        let Temp = parseInt(item.temp_c);
                                        const now = new Date();
                                        const currentHour = now.getHours();
                                        const currentMinute = now.getMinutes();
                                        const date = new Date(item.time_epoch * 1000);
                                        let hour = date.getHours();
                                        const minute = date.getMinutes();

                                        // Convert to 12-hour format
                                        let ampm = hour >= 12 ? "PM" : "AM";
                                        hour = hour % 12 || 12; // Convert 0 to 12 for midnight

                                        if (index === 0) {
                                            // Display "Now" for the first item
                                            return (
                                                <HourlyCard
                                                    Key={item.time}
                                                    Hour="Now"
                                                    Minute=""
                                                    Img={item.condition.icon}
                                                    Rain={item.chance_of_rain}
                                                    Temp={Temp}
                                                />
                                            );
                                        } else if (hour > currentHour || (hour === currentHour && minute >= currentMinute) || index >= 24) {
                                            // Show all upcoming hours for today & tomorrow
                                            return (
                                                <HourlyCard
                                                    Key={item.time}
                                                    Hour={`${hour} ${ampm}`}  // Format in 12-hour time
                                                    Minute=""
                                                    Img={item.condition.icon}
                                                    Rain={item.chance_of_rain}
                                                    Temp={Temp}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
                                ) : (
                                    <Text style={{ margin: 100 }}>Loading...</Text>
                                )}


                            </ScrollView>
                        </View>
                        <View style={styles.forecast_area}>
                            <Text style={{ margin: 10, color: "#00ff00", fontWeight: "bold" }}>Sunrise & Sunset</Text>


                            {data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0 ? (
                                <View style={styles.astro}>
                                    <View>
                                        <Image style={{ width: 40, height: 40 }} source={require('../Icon/sunrise.png')} />
                                        <Text>{data.forecast.forecastday[0].astro.sunrise}</Text>
                                    </View>
                                    <View>
                                        <Image style={{ width: 40, height: 40 }} source={require('../Icon/sunset.png')} />
                                        <Text>{data.forecast.forecastday[0].astro.sunset}</Text>
                                    </View>
                                </View>
                            ) : (
                                <Text style={{ margin: 10, color: "white" }}>Loading sunrise & sunset...</Text>
                            )}

                        </View>
                    </View>
                </View>
            )}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        />

    );
}



const styles = StyleSheet.create({
    main_area: {
        backgroundColor: "#0576f0",
        height: "100%"
    },
    weather_widget: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        margin: 10,
        padding: 5,
        borderRadius: 13
    },
    forecast_area: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        margin: 10,
        paddingLeft: 5,
        borderRadius: 13
    },
    daily_forecast: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },
    astro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        margin: 10,
        padding: 5,
        borderRadius: 13
    }

});

export default Home;