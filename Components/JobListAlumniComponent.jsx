import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobListAlumniComponent = ({ item }) => {
  // Function to convert Firestore timestamp to a JavaScript Date object
  const createdAtDate = item.createdAt ? item.createdAt.toDate() : null;

  // Function to format the date to display
  const formattedDate = createdAtDate ? createdAtDate.toLocaleString() : '';

  return (
    <>
      {item && (
        <View style={styles.container}>
          <Text style={styles.title}>{item.jobTitle}</Text>
          <Text style={styles.company}>{item.companyName}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.createdAt}>Created At: {formattedDate}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  company: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 14,
    color: '#999',
  },
});

export default JobListAlumniComponent;
