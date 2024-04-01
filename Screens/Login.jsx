import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ActivityIndicator, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { logInUser } from '../Firebase/FireStoreDB';
import CheckBox from 'react-native-check-box'
import { useTheme } from '@react-navigation/native';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const theme = useTheme();

    const translateY = useRef(new Animated.Value(-300)).current;

    const handleLogin = async () => {
        if (username === "" || password === "" ) {
            setError("Invalid Username or Password!!!");
        }
        else if(!isChecked){
            setError("Accept the Terms and Condition to go forward");
        }
        else {

            try {
                setLoading(true);
                const response = await logInUser(username, password);
                if(response){
                    navigation.replace('Home');
                }
                else{
                    setError("Invalid Credentials")
                }
            
            } catch (error) {
                setError(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const styles = StyleSheet.create({
        button: {
            padding: 10,
            backgroundColor : "#262626",
            marginVertical: 20,
            borderRadius: 10,
            width: 100
        },
        buttonText: {
            fontSize: 16,
            color: '#ffffff',
            textAlign: 'center',
        },
        inputStyle: {
            height: 50,
            width: '80%',
            borderRadius: 15,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 30,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
        },
        headingText: {
            fontSize: 32,
            width: '80%',
            marginBottom: 40,
            textAlign: "center",
        },
        subHeadingText: {
            fontSize: 16,
            width: '80%',
            marginBottom: 40,
            textAlign: "center"
        },
        normalText: {
            fontSize: 16,
        },
        highlightedText: {
            fontSize: 16,
            fontWeight: '800',
        },
        errorText: {
            color: 'red',
        }
    });

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000, // Adjust duration as needed
            useNativeDriver: true,
        }).start();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.subHeadingText}>Welcome Back! </Text>
            {/* <Text style={styles.headingText}>Alumni Tracking System </Text> */}
            <Animated.View style={{ transform: [{ translateY }] }}>
                <Text style={styles.headingText}>Alumni Tracking System </Text>
            </Animated.View>
            <TextInput
                style={styles.inputStyle}
                placeholder="Username"
                onChangeText={(text) => {
                    setError(null);
                    setUsername(text)
                }}
                value={username}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                onChangeText={(text) => {
                    setError(null);
                    setPassword(text)
                }}
                value={password}
                secureTextEntry={true}
            />
            <View
                style={{flexDirection : 'row' , alignContent : 'center', width : '70%'}}
            >
                <CheckBox
                style={{flex : 1}}
                    onClick={() => {
                        setIsChecked(!isChecked)
                    }}
                    isChecked={isChecked}
                    rightText={"Accept Terms and Conditions"}
                />
            </View>
            {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <Text style={styles.normalText}>Don't have an account?
                <Text style={styles.highlightedText} onPress={() => navigation.navigate('Signup')}>
                    {' '}Register
                </Text>
            </Text>
            {
                error &&
                <Text
                    style={styles.errorText}
                >{error}</Text>
            }
        </View>
    );
};

export default Login;
