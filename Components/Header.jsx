import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor : "white",
        paddingHorizontal : 20,
        paddingVertical : 10,
    },
    iconsContainer: {
        width : '20%',
        flexDirection: "row",
        justifyContent: "space-between",
    },
})

const HeaderComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={style.container}>
            <Text
                style={{ fontSize: 16 }}
            >Alumni Tracking System (Rishi D12C 38)</Text>
            <View
                style = {style.iconsContainer}
            >
                <Ionicons
                    name="notifications"
                    size={24}
                    color="black" />
                <Ionicons
                    name="chatbox-ellipses"
                    size={28}
                    color="black"
                    onPress={() => { navigation.navigate("Chat") }} />
            </View>
        </View>
    )
}



export default HeaderComponent;