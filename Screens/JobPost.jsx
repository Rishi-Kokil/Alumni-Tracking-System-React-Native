import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addJobToFirestore } from '../Firebase/FireStoreDB';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 5
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    marginVertical: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    height: 50
  },
  button: {
    backgroundColor: '#272A2B',
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: "70%"
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    marginTop: StatusBar.height || 0,
    paddingTop: 30,
    paddingLeft : 10,
  }
});

const JobPost = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [flag, setFlag] = useState(false);

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {

    if (jobTitle == "" || companyName == "" || location == "" || jobType == "" || description == "") {
      setError("Invalid Input");
    }

    else {
      console.log('Form submitted:', { jobTitle, companyName, location, jobType, description });
      setFlag(true);
      try {
        await addJobToFirestore(jobTitle, companyName, location, jobType, description);
        setJobTitle('');
        setCompanyName('');
        setLocation('');
        setJobType('');
        setDescription('');
        setError(null);
      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setFlag(false);
      }
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <SafeAreaView
        style={styles.container}
      >
        <Text style={styles.heading}>Post a Job</Text>
        <TextInput
          style={styles.input}
          placeholder="Job Title"
          value={jobTitle}
          onChangeText={setJobTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Job Type"
          value={jobType}
          onChangeText={setJobType}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {
          flag && <ActivityIndicator />
        }
        {
          error && <Text>{error}</Text>
        }
      </SafeAreaView>
    </>
  );
};



export default JobPost;
