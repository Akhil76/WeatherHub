import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../layout/Header';
import { useRoute } from '@react-navigation/native';
import CurrentWeather from '../components/CurrentWeather';
import DailyForecast from '../components/DailyForecast';
import HourlyForecast from '../components/HourlyForecast';
import SunCycle from '../components/SunCycle';

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
                        {
                        data.location && data.current && (
                            <CurrentWeather data={data}  />
                        )}
                        {data.forecast && data.forecast.forecastday && (
                            <DailyForecast forecast={data.forecast.forecastday} navigation={navigation} />
                        )}
                         {data.forecast && (
                            <HourlyForecast data={data} />
                        )}
                        <SunCycle data={data} />
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
      height: "100%",
    },
  });

export default Home;