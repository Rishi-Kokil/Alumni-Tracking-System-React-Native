import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderComponent } from "../Components";
import posts from "../Constants/homeConstants";
// https://22e9-103-6-187-65.ngrok-free.app/

const Home = () => {
  const [data, setData] = useState("Empty");

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {posts && posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
              style={styles.profileImage}
            />
            <View style={styles.postContent}>
              <Text style={styles.heading}>{post.heading}</Text>
              <Text style={styles.subheading}>{post.subheading}</Text>
              <Text style={styles.description}>{post.description}</Text>
              <Text style={styles.timestamp}>{post.created_at}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    gap: 10,
    backgroundColor: "#FFFFFF",
    // Android shadow
    elevation: 5,
    // iOS shadow
    shadowColor: "#DEDEDE",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },

  profileContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    padding: 10,
  },
  postContent: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 16,
    color: "gray",
  },
  description: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
});

export default Home;
