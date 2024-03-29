import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import { fetchAllJobs } from '../Firebase/FireStoreDB';
import JobListComponent from '../Components/JobListComponent';
import JobListAlumniComponent from '../Components/JobListAlumniComponent';

const Job = () => {
  const navigation = useNavigation();
  const options = ["Non-Alumni", "Alumni"];
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [role, setRole] = useState("");


  const fetchData = async () => {
    setJobsData(null);
    const headers = {
      'X-RapidAPI-Key': 'b8ddacfc01mshff1f0a2de9863f8p1656a4jsnca3951bfedd1',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    };

    const params = new URLSearchParams({
      query: "Tech",
      page: 1,
      nums_pages: 3,
    });


    const url = `https://jsearch.p.rapidapi.com/search?${params}`;

    try {
      const response = await fetch(url, { method: 'GET', headers: headers });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApiData(data.data);
      console.log(apiData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const fetchJobs = async () => {
    setApiData(null);
    try {
      const response = await fetchAllJobs();
      setJobsData(response);
      console.log(jobsData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <View
          style={styles.selectContainer}
        >
          <Feather name="list" size={24} color="black" />
          <SelectDropdown
            data={options}
            buttonStyle={styles.selectBox}
            buttonTextStyle={styles.selectBoxText}
            rowStyle={{ height: 40 }}
            rowTextStyle={{ textAlign: 'left', fontSize: 14 }}
            onSelect={async (selectedItem, index) => {
              setError(null);
              setIsLoading(true);
              setRole(selectedItem);
              if (selectedItem === 'Non-Alumni') {
                await fetchData();
              }
              else {
                await fetchJobs();
              }
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          />


        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("JobPost")
          }}
        >
          <MaterialCommunityIcons name="briefcase-plus" size={24} color="black" />
          <Text style={styles.buttonText}>Post Job</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      {
        isLoading && <ActivityIndicator size={30} />
      }
      {
        error
        &&
        <Text>{error}</Text>
      }
      {
        apiData
        &&

        <FlatList
          data={apiData}
          renderItem={({ item }) => <JobListComponent item={item} />}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={styles.body}
          ListEmptyComponent={isLoading ? <ActivityIndicator size="large" /> : <Text>{error || 'No jobs found'}</Text>}
        />

      }
      {
        jobsData
        &&
        <FlatList
          data={jobsData}
          renderItem={({ item }) => <JobListAlumniComponent item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.body}
          ListEmptyComponent={isLoading ? <ActivityIndicator size="large" /> : <Text>{error || 'No jobs found'}</Text>}
        />
      }

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    gap: 15,
  },
  selectBoxText: {
    padding: 0,
    margin: 0,
    fontSize: 14,
    textAlign: 'left',
  },
  selectBox: {
    padding: 0,
    margin: 0,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
  },
  line: {
    height: 1,
    backgroundColor: 'black',
  },
  body: {
    padding: 10,
    gap: 5,
  },

});

export default Job;
