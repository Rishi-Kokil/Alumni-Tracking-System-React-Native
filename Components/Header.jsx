import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding : 10,
    }
})

const HeaderComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={style.container}>
            <Text
                style={{ fontSize: 16 }}
            >Alumni Tracking System</Text>
            <Ionicons name="chatbox-ellipses" size={28
            } color="black" onPress={() => { navigation.navigate("Chat") }} />
        </View>
    )
}



export default HeaderComponent;