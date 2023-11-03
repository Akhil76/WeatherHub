import React, { useEffect, useState } from 'react';
import { TextInput, Text, View, StyleSheet ,Pressable} from 'react-native';
import { ApiKey } from '../OpenApiKey';
import PressableButton from '../components/PressableButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Search({navigation}:{navigation:any}) {
    var [city, onChangeText] = React.useState('');
    var [data, setData] = useState(Object);
    
    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`)
            .then(res => res.json())
            .then(res => setData(res))
            //.then(res => console.log(res))
            .catch(err => console.log(err))
    }, [city]);

    const saveLocation = async () => {
        
        try {
            await AsyncStorage.setItem('locationName', city);
            await navigation.navigate('Home',city);
           
        } catch (error) {
            console.log('Error saving location:', error);
        }
    };
    
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
                {data.location && (
                    <Pressable onPress={saveLocation}>
                        <Text 
                        style={{
                             fontSize: 20,
                             backgroundColor:"#00bfff",
                             height:60,
                             padding:15
                             }}
                        >{data.location['name']},{data.location['country']}</Text>
                    </Pressable>
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

export default Search;