import React, { useEffect, useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';
import { ApiKey } from '../OpenApiKey';
import PressableButton from '../components/PressableButton';

function Search({navigation}:{navigation:any}) {
    var [city, onChangeText] = React.useState('');
    var [data, setData] = useState(Object);
    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
            .then(res => res.json())
            .then(res => setData(res))
            //.then(res => console.log(res))
            .catch(err => console.log(err))
    }, [city]);
    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={city}
                />
            </View>
            <Text></Text>
            <View>
                {data.main && data.weather && (
                    <View>
                        <Text style={{ fontSize: 20 }}>{data['name']},{data['sys']['country']}{(data['main']['temp'] - 273).toFixed(2)}&deg;</Text>
                        
                        <PressableButton 
                        title={"Add"}
                        onPress={()=>navigation.navigate('Home',city)}
                        />
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

export default Search;