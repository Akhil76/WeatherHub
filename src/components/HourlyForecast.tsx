import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import HourlyCard from './HourlyCard';

export default function HourlyForecast({ data }: any) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const hours = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];

  return (
    <View style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", margin: 10, borderRadius: 13 }}>
      <Text style={{ margin: 10, color: "#00ff00", fontWeight: "bold" }}>Hourly Forecast</Text>
      <ScrollView horizontal={true} style={{ marginLeft: 5, marginRight: 10, marginBottom: 5 }}>
        {hours.map((item: any, index: number) => {
          const date = new Date(item.time_epoch * 1000);
          let hour = date.getHours();
          const minute = date.getMinutes();
          const ampm = hour >= 12 ? "PM" : "AM";
          hour = hour % 12 || 12;

          if (index === 0) {
            return (
              <HourlyCard
                Key={item.time}
                Hour="Now"
                Minute=""
                Img={item.condition.icon}
                Rain={item.chance_of_rain}
                Temp={parseInt(item.temp_c)}
              />
            );
          } else if (hour > currentHour || (hour === currentHour && minute >= currentMinute) || index >= 24) {
            return (
              <HourlyCard
                Key={item.time}
                Hour={`${hour} ${ampm}`}
                Minute=""
                Img={item.condition.icon}
                Rain={item.chance_of_rain}
                Temp={parseInt(item.temp_c)}
              />
            );
          }
          return null;
        })}
      </ScrollView>
    </View>
  );
}