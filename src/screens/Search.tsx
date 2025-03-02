import React, { useEffect, useState } from 'react';
import { TextInput, Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import PressableButton from '../components/PressableButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Search({ navigation }: { navigation: any }) {
    var [city, onChangeText] = React.useState('');
    var [data, setData] = useState(Object);
    var [locations, setLocations] = useState<string[]>([]);
    var [status, setStatus] = useState<string>('');


    const url = `https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}&days=7&aqi=no&alerts=no`

    useEffect(() => {
        fetchData();
        fetchSavedLocations();
    }, [city]);

    const fetchData = async () => {
        const results = await fetch(url);
        const data = await results.json();
        if (data !== null) {
            setData(data);

        } else {
            setStatus('Please,check your internet connection');
        }

    };
    // const saveLocation = async () => {

    //     try {
    //         await AsyncStorage.setItem('locationName', city);
    //         await navigation.navigate('Home',city);

    //     } catch (error) {
    //         console.log('Error saving location:', error);
    //     }
    // };
    // const saveLocation = async () => {
    //     try {
    //         await AsyncStorage.setItem('locationName', city);
    //         // Retrieve existing cities from AsyncStorage
    //         const storedCities = await AsyncStorage.getItem('locations');
    //         let citiesArray = storedCities ? JSON.parse(storedCities) : [];

    //         // Check if city already exists (optional)
    //         if (!citiesArray.includes(city)) {
    //             citiesArray.push(city);
    //         }

    //         // Save updated cities array back to AsyncStorage
    //         await AsyncStorage.setItem('locations', JSON.stringify(citiesArray));

    //         // Navigate to Home screen with updated list
    //         await navigation.navigate('Home',city);


    //     } catch (error) {
    //         console.log('Error saving location:', error);
    //     }
    // };
    const fetchSavedLocations = async () => {
        const locations = await AsyncStorage.getItem('locations');
        if (locations !== null) {
            const parsedData = JSON.parse(locations);
            setLocations(parsedData);
            console.log('Loaded location data from local storage.');
        }
        console.log("Getting saved data.");
    }
    const deleteLocation = async (locationToRemove: string) => {
        try {
            // Get saved locations
            const storedCities = await AsyncStorage.getItem('locations');
            let citiesArray = storedCities ? JSON.parse(storedCities) : [];

            // Remove the selected location
            const updatedCities = citiesArray.filter((loc: string) => loc !== locationToRemove);

            // Save updated list
            await AsyncStorage.setItem('locations', JSON.stringify(updatedCities));

            // Update state
            setLocations(updatedCities);
            console.log(`Deleted location: ${locationToRemove}`);
        } catch (error) {
            console.log('Error deleting location:', error);
        }
    };

    console.log(locations);
    return (
        <View style={{ backgroundColor: "#ccccff", height: "100%" }}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Search city'
                    onChangeText={onChangeText}
                    value={city}
                />
            </View>
            <View>
                <Pressable>
                    <Text>{status}</Text>
                </Pressable>
            </View>
            <View>
                {data.location && (

                    <Pressable
                        style={styles.listItem}
                        onPress={async () => {
                            try {
                                // Save single city location to AsyncStorage
                                await AsyncStorage.setItem('locationName', data.location['name']);


                                // Retrieve existing cities from AsyncStorage
                                const storedCities = await AsyncStorage.getItem('locations');
                                let citiesArray = storedCities ? JSON.parse(storedCities) : [];

                                // Check if city already exists (optional) and add new city
                                if (!citiesArray.includes(data.location['name'])) {
                                    citiesArray.push(data.location['name']);
                                }

                                // Save updated cities array back to AsyncStorage
                                await AsyncStorage.setItem('locations', JSON.stringify(citiesArray));
                                // Navigate to Home screen with updated list
                                await navigation.navigate('Home', data.location['name']);

                            } catch (error) {
                                console.log('Error saving location:', error);
                            }
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                backgroundColor: "#00bfff",
                                height: 60,
                                padding: 15
                            }}
                        >{data.location['name']},{data.location['country']}         {data.current['temp_c']}°c</Text>
                    </Pressable>

                )}
            </View>
            <ScrollView horizontal={false}>
                {locations && locations.map((location: any) => (
                    <View key={location} style={styles.listItem}>
                        <Pressable

                            onPress={async () => {
                                try {
                                    // Save location to AsyncStorage
                                    await AsyncStorage.setItem('locationName', location);

                                    // Navigate to Home screen with updated list
                                    await navigation.navigate('Home', location);
                                    // Retrieve existing cities from AsyncStorage

                                } catch (error) {
                                    console.log('Error saving location:', error);
                                }
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                   
                                    height: 60,
                                    padding: 15
                                }}
                            >{location}</Text>
                        </Pressable>
                        <Pressable onPress={() => deleteLocation(location)}>
                            <Text style={{
                                fontSize: 20,
                                color: 'red',
                                marginLeft: 10
                            }}>✖</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center', 
        padding: 10,
        margin: 2,
        backgroundColor: '#00bfff',
        borderRadius: 10,
    },

});

export default Search;