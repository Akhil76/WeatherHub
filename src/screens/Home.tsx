import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import { useRoute } from '@react-navigation/native';
import IconButton from '../components/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({ navigation }: { navigation: any }) {
    const city = useRoute()
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
        <ScrollView
            style={{
                backgroundColor: "#cce6ff",
                height: "100%"
            }}
        >
            <View style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10
            }}>
                <IconButton
                    Name={"search"}
                    Size={30}
                    onPress={() => navigation.navigate('Search')}
                />
                <IconButton
                    Name={"gear"}
                    Size={30}
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>

            <View>
                {
                    data.location && data.current && (
                        <View style={{ padding: 20 }}>
                            <View>
                                <Text style={{ fontSize: 40 }}>{data.location['name']}</Text>
                                <Text style={{ fontSize: 20 }}>{data.location['country']}</Text>
                                <Text style={{ fontSize: 80 }}>{data.current['temp_c']}</Text>
                                <Text style={{ fontSize: 30 }}>{data.current['condition']['text']}</Text>
                            </View>
                            <View>
                                <Image
                                    style={styles.tinyLogo}
                                    source={{
                                        uri: 'https:' + data.current['condition']['icon'],
                                    }}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: 40 }}>Wind:</Text>
                                <Text style={{ fontSize: 40 }}>Pressure:</Text>
                                <Text style={{ fontSize: 40 }}>Humidity:</Text>
                                <Text style={{ fontSize: 40 }}>Visibility:</Text>
                            </View>
                        </View>
                    )}
            </View>
            <View style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
            }}>
                {data.forecast && data.forecast.forecastday.map((day: { date: boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.Key | null | undefined; day: { maxtemp_c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; mintemp_c: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => (
                    <View style={{
                        backgroundColor: "yellow",
                        margin: 5,

                    }}>
                        <Text>Date: {day.date}</Text>
                        <Text>Max Temp: {day.day.maxtemp_c}°C</Text>
                        <Text>Min Temp: {day.day.mintemp_c}°C</Text>
                        {/* Add more forecast data as needed */}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    tinyLogo: {
        width: 200,
        height: 170,
    },
});

export default Home;