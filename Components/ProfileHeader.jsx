import { View, Text, StatusBar, StyleSheet } from 'react-native';
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical : 10,
    }
})

const ProfileHeader = ({title}) => {
    const navigation = useNavigation();
    return (
        <View style={style.container}>
            <Text
                style={{ fontSize: 16 }}
            >
                {title}
            </Text>
            <Ionicons name="settings" size={24} color="black" 
                onPress={()=> navigation.navigate("Settings")}
            />
        </View>
    )
}

export default ProfileHeader;