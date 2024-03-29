import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
{/* <FontAwesome name="user-circle-o" size={24} color="black" /> */}
{/* <FontAwesome name="briefcase" size={24} color="black" /> */}
{/* <FontAwesome name="plus-square-o" size={24} color="black" /> */}
{/* <FontAwesome name="search" size={24} color="black" /> */}
{/* <FontAwesome name="home" size={24} color="black" /> */}

const BottomNav = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingBottom: 5,
            backgroundColor: "transparent",
        },
        button: {
            paddingHorizontal: 15,
            paddingVertical : 5,
            color: "#86888A",
        },
        SelectedButton: {
            paddingHorizontal: 15,
            paddingVertical : 5,
            color: "#000000",
            borderTopWidth : 2,
        },
    
    });

   
    const routes = [
        { name: 'Home', icon: 'home' },
        { name: 'Search', icon: 'search' },
        { name: 'Post', icon: 'plus-square-o' },
        { name: 'Job', icon: 'briefcase' },
        { name: 'Profile', icon: 'user-circle-o' },
    ];

    const invisibleRoutes = ["Welcome", "Login", "Signup", "Chat"];

    useEffect(() => {

        const listener = navigation.addListener('state', () => {
            const currentRoute = navigation.getCurrentRoute();
            const selectedIndex = routes.findIndex(route => route.name === currentRoute.name);
            const visbility = invisibleRoutes.findIndex(route => route === currentRoute.name);
            if (visbility !== -1) {
                setIsVisible(false);
            }
            else {
                setIsVisible(true);
            }

            if (selectedIndex !== -1) {
                setSelected(selectedIndex);
            }
        });

        // Clean up the listener when the component is unmounted
        return () => {
            navigation.removeListener('state');
        };
    }, [navigation]);

    const onPressHandler = (route) => {
        navigation.navigate(route);
    }

    if (!isVisible) {
        return null; // Render nothing if isVisible is false
    }

    return (
        <View style={styles.container}>
            {isVisible && routes.map((route, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onPressHandler(route.name)}
                    style={styles.button}
                    activeOpacity={0.5} // Set the opacity of the touchable effect
                >
            
                    <FontAwesome 
                        name={route.icon}
                        size={27}
                        style={selected === index ? styles.SelectedButton : styles.button}
                    />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default BottomNav;
