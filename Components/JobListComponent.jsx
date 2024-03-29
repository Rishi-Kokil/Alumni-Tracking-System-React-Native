import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const JobListComponent = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.employer_logo }} style={styles.logo} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.job_title}</Text>
        <Text style={styles.company}>{item.employer_name}</Text>
        <Text style={styles.type}>{item.job_employment_type}</Text>
        <Text style={styles.posted}>Posted {item.job_posted_at_datetime_utc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom : 5,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  type: {
    fontSize: 14,
    color: '#333',
  },
  posted: {
    fontSize: 12,
    color: '#999',
  },
});

export default JobListComponent;
