import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DailyCard from './DailyCard';

export default function DailyForecast({ forecast, navigation }: any) {
  return (
    <View style={styles.forecast_area}>
      <Text style={styles.title}>Daily forecast</Text>
      <View style={styles.daily_forecast}>
        {forecast.map((day: any) => {
          let date = new Date(day.date);
          let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
          return (
            <DailyCard
              Key={day.date}
              DayName={dayname}
              Img={day.day.condition.icon}
              Condition={day.day.condition.text}
              MaxT={parseInt(day.day.maxtemp_c)}
              MinT={parseInt(day.day.mintemp_c)}
              SunRise={day.astro.sunrise}
              SunSet={day.astro.sunset}
              navigation={navigation}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  forecast_area: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    margin: 10,
    paddingLeft: 5,
    borderRadius: 13,
  },
  title: {
    margin: 10,
    color: "#00ff00",
    fontWeight: "bold",
  },
  daily_forecast: {
    flexDirection: "row",
  },
});