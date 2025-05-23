import React from 'react';
import { View, StyleSheet } from 'react-native';
import TempCard from './TempCard';
import Card from './Card';

interface Props {
    data: any;

}

export default function CurrentWeather({ data }: Props) {

    // Function to get relative time
    const getRelativeTime = (lastUpdated: string) => {
        const lastUpdateDate = new Date(lastUpdated);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - lastUpdateDate.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        } else if (diffInSeconds < 86400) {
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        } else {
            return `${Math.floor(diffInSeconds / 86400)} days ago`;
        }
    };
    return (
        <View>
            <TempCard
                Img={data.current['condition']['icon']}
                Condition={data.current['condition']['text']}
                Temp={parseInt(data.current['temp_c'])}
                lastupdate={getRelativeTime(data.current.last_updated)}
                LocalTime={""}
            />
            <View style={styles.weather_widget}>
                <Card Name="Feels like" Condition={parseInt(data.current['feelslike_c'])} Symbol={"°c"} />
                <Card Name="Humidity" Condition={data.current['humidity']} Symbol={"%"} />
                <Card Name="Wind" Condition={parseInt(data.current['wind_kph'])} Symbol={"kph"} />
                <Card Name="Cloud" Condition={data.current['cloud']} Symbol={"%"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    weather_widget: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        margin: 10,
        padding: 5,
        borderRadius: 13,
    },
});