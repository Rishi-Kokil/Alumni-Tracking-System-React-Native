import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';


const UserListComponent = ({ users }) => {
    return (
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <View style={styles.userItem}>
                    <Text>{item.fullname}</Text>
                    <Text>{item.email}</Text>
                </View>
            )}
            keyExtractor={(item) => item.userId}
        />
    );
};

export default UserListComponent;