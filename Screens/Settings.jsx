import { root } from 'postcss';
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = ({ navigation }) => {
  const handleLogout = async () => {
    // Perform logout actions here (e.g., clear user session, navigate to login screen)
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("profileId");
    await AsyncStorage.removeItem("auth");
    navigation.navigate('Login'); // Navigate to the login screen after logout
  };

  const handleTheme = ()=>{
    console.log("Theme Clicked");
  }


  const buttons = [
    {
      id : 1,
      title : "Theme",
      handler : handleTheme,
      icon : "theme-light-dark"
    },
    {
      id : 2,
      title : "Log Out",
      handler : handleLogout,
      icon : "logout"
    },
  ]

  return (
    <View style={styles.container}>
        {
          buttons.map(
            (item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.button}
                onPress={item.handler} 
              >
                <MaterialCommunityIcons 
                  name={item.icon} 
                  size={24} 
                  color="white"
                />
                 <Text style={styles.buttonText}>{item.title}</Text>
              </TouchableOpacity>
            )
          )
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap : 5,
    paddingVertical : 20,
  },
  button : {
    width : '95%',
    backgroundColor : "#272A2B",
    borderRadius : 10,
    height : 50,
    flexDirection : "row",
    gap : 30,
    alignItems : 'center',
    paddingLeft : 30,
  },
  buttonText : {
    color : "white"
  }
});

export default Settings;
