import React, { useEffect, useState } from 'react';
import { TextInput, Text, View, StyleSheet ,Pressable} from 'react-native';
import { ApiKey } from '../OpenApiKey';
import PressableButton from '../components/PressableButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Search({navigation}:{navigation:any}) {
    var [city, onChangeText] = React.useState('');
    var [data, setData] = useState(Object);
    var [locations, setLocations] = useState<string[]>([]);
    var [status, setStatus] = useState<string>('');
    

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${ApiKey}&q=${city}&days=7&aqi=no&alerts=no`
    
    useEffect(() => {
        fetchData();
        fetchSavedLocations();
    }, [city]);

    const fetchData = async()=>{
        const results = await fetch(url);
        const data = await results.json();
        if (data !== null) {
            setData(data);
           
        }else
        {
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
    const saveLocation = async () => {
        try {
            await AsyncStorage.setItem('locationName', city);
            // Retrieve existing cities from AsyncStorage
            const storedCities = await AsyncStorage.getItem('locations');
            let citiesArray = storedCities ? JSON.parse(storedCities) : [];
    
            // Check if city already exists (optional)
            if (!citiesArray.includes(city)) {
                citiesArray.push(city);
            }
    
            // Save updated cities array back to AsyncStorage
            await AsyncStorage.setItem('locations', JSON.stringify(citiesArray));
    
            // Navigate to Home screen with updated list
            await navigation.navigate('Home',city);
            
    
        } catch (error) {
            console.log('Error saving location:', error);
        }
    };
    const fetchSavedLocations = async()=>{
        const locations = await AsyncStorage.getItem('locations');
        if (locations !== null) {
                 const parsedData = JSON.parse(locations);
                 setLocations(parsedData);
                 console.log('Loaded location data from local storage.');
             }
        console.log("Getting saved data.");
    }
    console.log(locations);
    return (
        <View style={{backgroundColor:"#ccccff",height:"100%"}}>
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
                    <Pressable onPress={saveLocation}>
                        <Text 
                        style={{
                             fontSize: 20,
                             backgroundColor:"#00bfff",
                             height:60,
                             padding:15
                             }}
                        >{data.location['name']},{data.location['country']}         {data.current['temp_c']}°c</Text>
                    </Pressable>
                )}
            </View>
            <View>
                {locations && locations.map((location:any) => (
                    <Pressable onPress={saveLocation}>
                        <Text 
                        style={{
                             fontSize: 20,
                             backgroundColor:"#00bfff",
                             height:60,
                             padding:15
                             }}
                        >{location}</Text>
                    </Pressable>
                ))}
            </View>    
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
});

export default Search;