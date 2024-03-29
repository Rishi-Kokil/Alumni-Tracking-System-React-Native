import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import UserListComponent from '../Components/UserListComponent';
import { searchUsers } from '../Firebase/FireStoreDB';

const Search = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      if (search == "")
        throw new Error("Enter Text to Search");

      const response = await searchUsers(search);
      console.log(response);
      setUsers(response);
    }
    catch (error) {
      setError(error.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => {
            setError(null);
            setSearch(text);
          }}
          onBlur={
            () => {
              handleSearch(search);
            }
          }
          value={search}
        />
      </View>
      {
        loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <UserListComponent users={users} />
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 20,
    borderColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#DEDEDE",
  },
  input: {
    marginLeft: 10,
    flex: 1,
  }
});

export default Search;
