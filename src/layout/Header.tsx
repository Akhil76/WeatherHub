import React from 'react';
import { View, Text, StyleSheet,Image, Pressable } from 'react-native';
import IconButton from '../components/IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';



interface Props {
    navigation: any;
    Location: string | null;
    Country: string | null;
}

function Header({ navigation, Location, Country }: Props) {

    return (
        <SafeAreaView style={styles.btn_area}>
            <Pressable onPress={() => navigation.navigate('Search')}>
                <Image
                    style={{ width: 45, height: 45,marginTop:20}}
                    source={require('../Icon/search1.png')}
                />
            </Pressable>
            <View>
                <View >
                    <Text style={{ fontSize: 30, color: "#00ff00" }}>{Location}</Text>
                    <Text style={{ fontSize: 15, color: "#00ff00" }}>{Country}</Text>
                </View>
            </View>
            <Pressable onPress={() => navigation.navigate('Settings')}>
                <Image
                    style={{ width: 45, height: 45,marginTop:20}}
                    source={require('../Icon/settings.png')}
                />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btn_area: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
    },
});

export default Header;