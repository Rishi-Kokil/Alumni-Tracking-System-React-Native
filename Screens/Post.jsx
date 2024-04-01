import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../Firebase/FireStoreDB';

const Post = () => {
  const [title, setTitle] = useState('');
  const [subheading, setSubheading] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const handleSelectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }

    } catch (error) {
      setError(error.message)
    }
  };

  const clearForm = () => {
    setTitle("");
    setSubheading("");
    setImageUri(null);
    setError(null);
    setDescription("");
  }

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handlePost = async () => {
    // Handle posting logic here
    try {
      const response = await createPost(title, subheading, description, imageUri);
      console.log(response);
      clearForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      gap: 5,
      padding: 10,
    },
    inputStyle: {
      height: 50,
      width: '80%',
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    multilineInput: {
      height: 100,
      width: '80%',
      borderRadius: 15,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      textAlignVertical: 'top', // Allow multiline text input to start from top
    },
    button: {
      padding: 10,
      backgroundColor: '#272A2B',
      borderRadius: 10,
      width: 200,
      marginTop: 10,
    },
    buttonText: {
      fontSize: 16,
      color: '#ffffff',
      textAlign: 'center',
    },
    errorText: {
      color: 'red',
    },
    imageContainer: {
      marginTop: 20,
    },
    headingText: {
      fontSize: 32,
      width: '80%',
      marginBottom: 40,
      textAlign: "center"
    },
    image: {
      width: 200,
      height: 200,
    },
  });


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingText}>Create Post</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Post Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Post Subheading"
        onChangeText={setSubheading}
        value={subheading}
      />
      <TextInput
        style={styles.multilineInput}
        placeholder="Post Description"
        onChangeText={setDescription}
        value={description}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSelectImage}
      >
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePost}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
      {
        imageUri && <Image source={{ uri: imageUri }} style={styles.image} />
      }
      {error && <Text style={styles.errorText}>{error}</Text>}
    </SafeAreaView>
  );
};

export default Post;
