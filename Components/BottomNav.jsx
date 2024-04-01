import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
            paddingVertical: 5,
            flex: 1,
            alignItems: 'center',
            gap : 3,
        },
        SelectedButton: {
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderTopWidth: 2,
            flex: 1,
            alignItems: 'center',
            gap : 3,
        },
        icon: {
            color: "#86888A",
        },
        SelectedIcon: {
            color: "#000000",
        },
        text: {
            fontSize: 10,
            color: "#86888A",
        },
        selectedText: {
            fontSize: 10,
            color: "#000000",
        }

    });


    const routes = [
        { name: 'Home', icon: 'home', text: "Home" },
        { name: 'Search', icon: 'search', text: "Search" },
        { name: 'Post', icon: 'plus-square-o', text: "Post" },
        { name: 'Job', icon: 'briefcase', text: "Job" },
        { name: 'Profile', icon: 'user-circle-o', text: "Profile" },
    ];

    const invisibleRoutes = ["Welcome", "Login", "Signup", "Chat", "Map", "Settings", "Qr"];

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
                    style={selected === index ? styles.SelectedButton : styles.button}
                    activeOpacity={0.5} // Set the opacity of the touchable effect
                >
                    <FontAwesome
                        name={route.icon}
                        size={27}

                        style={selected === index ? styles.SelectedIcon : styles.icon}
                    />
                    <Text
                        style={selected === index ? styles.selectedText : styles.text}
                    >{route.text}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default BottomNav;
