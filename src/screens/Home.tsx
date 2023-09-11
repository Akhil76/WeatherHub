import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ApiKey } from '../OpenApiKey';

function Home(){
    const city = "Kushtia";
    const [ data,setData]= useState(Object);
    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`)
        .then(res=>res.json())
        .then(res=>setData(res))
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    },[]);
    
  return (
    <View>
      <Text>Home</Text>
      <Text style={{fontSize:80}}>{data['name']}</Text>
      <Text style={{fontSize:80}}>{(data['main']['temp']-273).toFixed(2)}&deg;</Text>
      <Text style={{fontSize:50}}>{data['weather'][0]['main']}</Text>
      
      <View>
        <Text style={{fontSize:40}}>Wind:{data['wind']['speed']}</Text>
        <Text style={{fontSize:40}}>Pressure:{data['main']['pressure']}</Text>
        <Text style={{fontSize:40}}>Humidity:{data['main']['humidity']}</Text>
        <Text style={{fontSize:40}}>Visibility:{data['visibility']}</Text>
      </View>
    </View>
  );
}


export default Home;