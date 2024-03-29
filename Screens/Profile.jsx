import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from '../Components/ProfileHeader';
import { fetchUserProfile } from '../Firebase/FireStoreDB';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  //Section in the Page
  detailsSection: {
    height: "50%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-around',
  },
  countSection: {
    flexDirection: 'row',
    gap: 10,
  },
  detailsSubSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexWrap: 'wrap',
    flexBasis: '30%',
    columnGap: 5,
    borderTopWidth: 1,
    rowGap: 2,
  },
  //Elements
  header: {
    height: '10%',
    borderWidth: 2,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fullName: {
    fontSize: 26,
  },
  description: {
    fontSize: 16,
  },
  editProfileButton: {
    padding: 10,
    backgroundColor: '#272A2B',
    marginVertical: 20,
    borderRadius: 10,
    width: '60%',
  },

  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },

});

const Profile = () => {

  const [data, setData] = useState(null);
  const navigation = useNavigation();
  let DataMap;
  if (data) {
    DataMap = [
      { id: 1, "title": "Post", "value": data.PostCount || 0 },
      { id: 2, "title": "Followers", "value": data.Followers || 0 },
      { id: 3, "title": "Following", "value": data.Following || 0 },
    ]
  }
  else {
    DataMap = [];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserProfile();
        console.log(response);
        setData(response);
      }
      catch (error) {
        console.log(error.message);
      }
    }

    fetchData();
  }, [])

  return (
    <SafeAreaView>
      <ProfileHeader title={"userName"} style={styles.header} />
      { !data && <ActivityIndicator />}
      {
        data
        && (
          <>
            <View style={styles.detailsSection}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
                style={styles.profileImage}
              />
              <View
                style={styles.detailsSubSection}
              >
                <View style={styles.countSection}>
                  {data && DataMap.map(
                    (item) => (
                      <View
                        key={item.id}
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: "center",
                        }}
                      >
                        <Text>{item.value}</Text>
                        <Text style={styles.postCount}>{item.title}</Text>
                      </View>
                    )
                  )
                  }
                </View>

                <Text style={styles.fullName}>{data && data.fullname || "Full Name"}</Text>
                <Text style={styles.description}>{data && data.description || "Description"}</Text>

                <TouchableOpacity
                  style={styles.editProfileButton}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editProfileButton}
                  onPress={
                    ()=>{
                      navigation.navigate("Map");
                    }
                  }
                >
                  <Text style={styles.buttonText}>Map Location</Text>
                </TouchableOpacity>
                

              </View>
            </View>
            
            <View style={styles.gallery}>
              <Text style={styles.posts}>Posts</Text>
            </View>
            
          </>
        )
      }

    </SafeAreaView>
  );
}


export default Profile;
