import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
            <IconButton
                Name={"search"}
                Size={35}
                onPress={() => navigation.navigate('Search')}
            />
            <View>
                <View >
                    <Text style={{fontSize:30,color:"#00ff00"}}>{Location}</Text>
                    <Text style={{fontSize:15,color:"#00ff00"}}>{Country}</Text>
                </View>
            </View>
            <IconButton
                Name={"gear"}
                Size={35}
                onPress={() => navigation.navigate('Settings')}
            />
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