import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SunCycle({ data }: any) {
  if (!data.forecast || data.forecast.forecastday.length === 0) return null;

  const astro = data.forecast.forecastday[0].astro;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sunrise & Sunset</Text>
      <View style={styles.row}>
        <View>
          <Image style={styles.icon} source={require('../Icon/sunrise.png')} />
          <Text>{astro.sunrise}</Text>
        </View>
        <View>
          <Image style={styles.icon} source={require('../Icon/sunset.png')} />
          <Text>{astro.sunset}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    margin: 10,
    padding: 5,
    borderRadius: 13,
  },
  title: {
    margin: 10,
    color: "#00ff00",
    fontWeight: "bold",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 40,
    height: 40,
  },
});