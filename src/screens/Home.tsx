import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import PressableButton from '../components/PressableButton';
import { useRoute } from '@react-navigation/native';



function Home({ navigation }: { navigation: any }) {
    const city = useRoute()
    var [data, setData] = useState(Object);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.params}&appid=${ApiKey}`)
            .then(res => res.json())
            .then(res => setData(res))
            //.then(res => console.log(res))
            .catch(err => console.log(err))
    }, [city.params]);

    return (
        <View>
             <Text style={{fontSize:40}}>Current Weather</Text>
            <View style={{
                display:"flex", flexWrap:"wrap",
                flexDirection:"row",
                justifyContent:"space-between",
                }}>
                <PressableButton
                    title={"Search"}
                    onPress={() => navigation.navigate('Search')}
                />
                <PressableButton
                    title={"Settings"}
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
           
            <View>
                {
                data.main && data.weather && data.wind && (
                    <View>
                        <Text style={{ fontSize: 60 }}>{data['name']},{data['sys']['country']}</Text>
                        <Text style={{ fontSize: 80 }}>{(data['main']['temp'] - 273).toFixed(2)}&deg;</Text>
                        <Text style={{ fontSize: 50 }}>{data['weather'][0]['main']}</Text>
                        <View>
                            <Text style={{ fontSize: 40 }}>Wind:{data['wind']['speed']}</Text>
                            <Text style={{ fontSize: 40 }}>Pressure:{data['main']['pressure']}</Text>
                            <Text style={{ fontSize: 40 }}>Humidity:{data['main']['humidity']}</Text>
                            <Text style={{ fontSize: 40 }}>Visibility:{data['visibility']}</Text>
                        </View>
                    </View>
                )}
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

export default Home;