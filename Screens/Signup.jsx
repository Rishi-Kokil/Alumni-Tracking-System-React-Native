import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Slider from "react-native-slider";
import SelectDropdown from 'react-native-select-dropdown'
import { signUpUser } from '../Firebase/FireStoreDB';

const Signup = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const [error, setError] = useState(null);
  const [age, setAge] = useState(18); // Default age

  const handleSignup = async () => {
    setLoading(true);
    if (email === "" || password === "" || fullname === "" || role === "") {
      setError("Invalid Username or Password!!!");
    }
    else {
      try {
        await signUpUser(email, password, fullname, age, role);
        navigation.replace('Home');
      } catch (error) {
        setError(error.message);
        console.log(error);
        // Handle login failure (e.g., display error message)
      } finally {
        setLoading(false);
      }
    }
  };

  const options = ["Alumni", "Student"];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headingText: {
      fontSize: 32,
      width: "80%",
      marginBottom: 35,
      textAlign: "center"
    },
    input: {
      height: 50,
      width: '80%',
      borderRadius: 15,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 30,
    },
    inputText: {
      textAlign: 'left',
      fontSize: 14
    },

    button: {
      padding: 10,
      backgroundColor: '#272A2B',
      borderRadius: 10,
      width: 100,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
    subHeadingText: {
      fontSize: 16,
      width: '80%',
      marginBottom: 40,
      textAlign: "center"
    },
    Slider: {
      width: '70%',
      height: 20,
      marginBottom: 30,
      marginTop: 30
    },
    errorText: {
      color: 'red',
    }
  });

  return (
    <View style={styles.container}>

      <Text style={styles.headingText}>Alumni Tracking System </Text>
      <Text style={styles.subHeadingText}>We are happy to have you here</Text>


      <SelectDropdown
        data={options}
        buttonStyle={styles.input}
        buttonTextStyle={styles.inputText}
        rowStyle={{ textAlign: 'left', fontSize: 14 }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
          setError(null);
          setRole(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Fullname"
        onChangeText={(text) => {
          setError(null);
          setFullname(text)
        }}
        value={fullname}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setError(null);
          setEmail(text)
        }}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => {
          setError(null);
          setPassword(text)
        }
        }
        value={password}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age.toString()}
        editable={false}
      />

      <Slider
        style={styles.Slider}
        minimumValue={18}
        maximumValue={100}
        step={1}
        value={age}
        onValueChange={value => setAge(value)}
        thumbStyle={{
          width: 20, // Adjust thumb width
          height: 20, // Adjust thumb height
          borderRadius: 5, // Adjust thumb border radius to make it round
          backgroundColor: '#272A2B', // Adjust thumb color
        }}
        thumbTouchSize={{ width: 60, height: 60 }}
      />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff" />}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 10 }}>Already have an account?
        <Text style={{ color: 'black', fontWeight: 800 }} onPress={() => navigation.navigate('Login')}>
          {' '}Log In
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

export default Signup;
