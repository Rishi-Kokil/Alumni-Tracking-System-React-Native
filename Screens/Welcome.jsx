import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import SplashAnimation from "../Animation/SplashScreen1.json"
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Welcome = ({ navigation }) => {
    const [animationFinished, setAnimationFinished] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Check if the user is already authenticated
                const userId = await AsyncStorage.getItem("userId");
                if (userId) {
                    // If user is authenticated, navigate to Home screen
                    navigation.replace('Home');
                } else {
                    // If user is not authenticated, listen for authentication state changes
                    const auth = getAuth();
                    const unsubscribe = onAuthStateChanged(auth, (user) => {
                        if (user) {
                            // If user is signed in, navigate to Home screen
                            navigation.replace('Home');
                        } else {
                            // If user is not signed in, navigate to Login screen after animation finishes
                            if (animationFinished) {
                                navigation.replace('Login');
                            }
                        }
                    });

                    // Clean up the subscription when component unmounts
                    return () => unsubscribe();
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                // If error occurs, navigate to Login screen
                navigation.replace('Login');
            }
        };

        if (animationFinished) {
            checkAuthentication();
        }
    }, [animationFinished, navigation]);

    const onAnimationFinish = () => {
        // Set animationFinished to true once the animation completes
        setAnimationFinished(true);
    };

    return (
        <SafeAreaView
            style={
                {
                    backgroundColor: '#288fee',
                }
            }
        >
            <LottieView
                style={{
                    width: 'auto',
                    height: '100%',
                    borderWidth: 2,
                    borderColor: 'black',
                }}
                source={SplashAnimation}
                autoPlay
                loop={false}
                onAnimationFinish={onAnimationFinish} // Call onAnimationFinish when animation completes
                speed={1.5}
            />
        </SafeAreaView>
    );
};

export default Welcome;
