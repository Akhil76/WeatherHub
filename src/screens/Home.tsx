import React, { useEffect, useState, useCallback} from 'react';
import { ScrollView, Text, View, StyleSheet, FlatList, RefreshControl } from 'react-native';
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

function Home({ navigation}: Props) {
    var [data, setData] = useState(Object);
    var [localData, setLocalData] = useState(Object);
    const [location, setLocation] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const city = useRoute();
    //console.log(city.params);
    console.log(location);
    console.log(localData);
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
            // After fetching data and setting data state
        AsyncStorage.setItem('weatherData', JSON.stringify(data))
        .then(() => {
            console.log('Weather data saved to local storage.');
        })
        .catch((error) => {
            console.log('Error saving weather data:', error);
        });

        loadSavedWeatherData();
        setRefreshing(false);
    },[city.params,location]);
    
    const onRefresh = useCallback(() => {


        setRefreshing(true); // Start the refreshing spinner

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${location}&days=3&aqi=no&alerts=no`)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setRefreshing(false); // Stop the refreshing spinner when data is received
            })
            .catch((err) => {
                console.log(err);
                setRefreshing(false); // Stop the refreshing spinner on error
            });
    }, [location]);

    const loadSavedWeatherData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('weatherData');
            if (savedData !== null && data == null) {
                const parsedData = JSON.parse(savedData);
                setData(parsedData);
                console.log('Loaded weather data from local storage.');
            }
        } catch (error) {
            console.log('Error loading weather data:', error);
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
                        <View >
                            {
                                data.location && data.current && (
                                    <View>
                                        <TempCard
                                            Img={data.current['condition']['icon']}
                                            Condition={data.current['condition']['text']}
                                            Temp={data.current['temp_c']}
                                            LocalTime={data.location['localtime']}
                                        />
                                        <View style={styles.weather_widget}>
                                            <Card Name="Feels like" Condition={data.current['feelslike_c']} Symbol={"°c"} />
                                            <Card Name="Humdity" Condition={data.current['humidity']} Symbol={"%"} />
                                            <Card Name="Wind" Condition={data.current['wind_kph']} Symbol={""} />
                                            <Card Name="Cloud" Condition={data.current['cloud']} Symbol={"%"} />
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
                            <ScrollView horizontal={true} style={{ marginLeft: 5, marginRight: 10, marginBottom: 5 }}>
                                {data && data.location && data.forecast && data.forecast.forecastday ? (
                                    data.forecast.forecastday[0].hour.map((item: any, index: any) => {


                                        let Temp = parseInt(item.temp_c);
                                        // Calculate the current time
                                        const now = new Date();
                                        const currentHour = now.getHours();
                                        const currentMinute = now.getMinutes();

                                        // Parse the time from the item
                                        const date = new Date(item.time_epoch * 1000);
                                        const hour = date.getHours();
                                        const minute = date.getMinutes();

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
                                        } else if (hour > currentHour || (hour === currentHour && minute >= currentMinute)) {
                                            return (
                                                <HourlyCard
                                                    Key={item.time}
                                                    Hour={hour}
                                                    Minute={minute}
                                                    Img={item.condition.icon}
                                                    Rain={item.chance_of_rain}
                                                    Temp={Temp}
                                                />
                                            );
                                        } else {
                                            // Optionally, you can return null for past hours if you don't want to display them
                                            return null;
                                        }
                                    })
                                ) : (
                                    <Text style={{ margin: 100 }}>Loading...</Text>
                                )}
                            </ScrollView>
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
        backgroundColor: "#008000",
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
        paddingLeft:5,
        borderRadius: 13
    },
    daily_forecast: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
    },

});

export default Home;