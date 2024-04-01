import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const RenderItem = ({ item, index }) => {
    return (
        <View
            key={index}
            style={styles.postContainer}>
            <View style={styles.postDetails}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <Text style={styles.postSubheading}>{item.subheading}</Text>
                <Text style={styles.postCreator}>Created by: {item.creator}</Text>
                <Text style={styles.postDescription}>{item.description}</Text>
            </View>
            <View style={styles.postImageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
            </View>
            <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name="heart" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name="message-circle" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name="more-vertical" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const PostListComponent = ({ posts }) => {
    return (
        <FlatList
            data={posts}
            style={styles.body}
            renderItem={({ item, index }) => <RenderItem item={item} index={index}/>}
            keyExtractor={(item) => item.id} // Assuming each post has a unique ID
        />
    );
};

const styles = StyleSheet.create({
    postActions: {
        paddingHorizontal : 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    actionButton: {
        padding: 10,
    },
    body: {
        paddingVertical: 10,
        height : "62%"
    },
    postContainer: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    postDetails: {
        flex: 1,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postSubheading: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    postCreator: {
        fontSize: 13,
        marginBottom: 5,
        color: '#777',
    },
    postDescription: {
        fontSize: 13,
        marginBottom: 5,
    },
    postImageContainer: {
        marginTop : 5,
        borderRadius: 10,
        width : "100%",
        overflow: 'hidden', // Clip the image to the rounded corners
    },
    postImage: {
        width: '100%',
        aspectRatio: 1, 
        borderRadius: 15,
        alignSelf: 'center', 
    },
});

export default PostListComponent;
