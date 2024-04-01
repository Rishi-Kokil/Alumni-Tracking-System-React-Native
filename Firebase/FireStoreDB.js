import {
    getFirestore,
    collection,
    where,
    query,
    addDoc,
    getDoc,
    getDocs,
    doc,
    serverTimestamp,
    updateDoc,
    arrayUnion
} from "firebase/firestore";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "./FirebaseConfig"

const db = getFirestore(); // Get reference to Firestore instance
const storage = getStorage(app);

const signUpUser = async (email, password, fullname, age, role) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        await AsyncStorage.setItem('userId', userId);
        await storeUserProfile(fullname, email, age, userId, role);

    } catch (error) {
        return error;
    } 
}

const logInUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        await AsyncStorage.setItem('userId', userId);

        // Corrected the field name in the query
        const profileQuery = query(collection(db, "users"), where("userId", "==", userId));
        const profileSnapshot = await getDocs(profileQuery);
        console.log(profileSnapshot.docs);
        if (!profileSnapshot.empty) {
            // Get the first profile found (assuming there's only one profile per user)
            const profileDoc = profileSnapshot.docs[0];
            const profileId = profileDoc.id;
            console.log(profileId);
            // Store the profileId in AsyncStorage
            await AsyncStorage.setItem('profileId', profileId);
        } else {
            console.log('Profile not found for user')
            return new Error("user Not Found");
        }

        return true;
    } catch (error) {
        return false;
        console.error('Error logging in:', error);
        return new Error(error.message);
    }
}

const storeUserProfile = async (fullname, email, age, uId, role) => {
    try {
        // Add a new document with a generated ID to the "users" collection
        const docRef = await addDoc(collection(db, "users"), {
            userId: uId,
            role: role,
            fullname: fullname,
            email: email,
            age: age,
            Posts: [], // Initialize as empty array
            PostCount: 0,
            Followers: 0,
            Following: 0,
            jobsCreated: [],
        });
        await AsyncStorage.setItem('profileId', docRef.id);
    } catch (e) {
        return e;
    }
};

const fetchUserProfile = async () => {
    try {
        // Retrieve the user ID from AsyncStorage
        const userId = await AsyncStorage.getItem('profileId');
        if (!userId) {
            console.log('User ID not found in AsyncStorage');
            return null;
        }

        // Get a reference to the user document in Firestore
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            console.log('User document does not exist');
            return null;
        }

        // Extract user data from the document snapshot
        const userData = userDocSnapshot.data();

        // Fetch post details for each post ID in the user's 'Posts' array
        const postsWithDetails = await Promise.all(userData.Posts.map(fetchPostById));
        // Add post details to the user data
        userData.Posts = postsWithDetails;

        return userData; // Return the user data with post details
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Error(error.message);
    }
};

const addJobToFirestore = async (jobTitle, companyName, location, jobType, description) => {
    try {
        // Get the profileId from AsyncStorage
        const profileId = await AsyncStorage.getItem("profileId");

        // Check if profileId is null or undefined
        if (!profileId) {
            throw new Error("Profile ID not found in AsyncStorage");
        }

        // Get a reference to the user document in the "users" collection
        const userDocRef = doc(db, "users", profileId);

        // Get a Firestore reference to the "Jobs" collection
        const jobsCollectionRef = collection(db, "Jobs");

        // Add a new document to the "Jobs" collection with the provided job details
        const docRef = await addDoc(jobsCollectionRef, {
            jobTitle: jobTitle,
            companyName: companyName,
            location: location,
            jobType: jobType,
            description: description,
            createdBy: profileId, // Use the profileId as createdBy
            createdAt: serverTimestamp(), // Add the current timestamp as "createdAt" field using Firestore server timestamp
        });

        console.log("Job added with ID: ", docRef.id);

        // Update the user's profile with the newly created job document ID
        await updateDoc(userDocRef, {
            jobsCreated: arrayUnion(docRef.id) // Add the new job document ID to the "jobsCreated" array field
        });

        console.log(docRef.id) // Return the ID of the newly added job document
    } catch (error) {
        console.error("Error adding job: ", error);
        throw error; // Throw the error for handling in the calling function
    }
};

const fetchAllJobs = async () => {
    try {
        const jobsCollectionRef = collection(db, 'Jobs');
        const querySnapshot = await getDocs(jobsCollectionRef);

        const jobs = [];
        querySnapshot.forEach(doc => {
            const jobData = doc.data();
            jobs.push({ id: doc.id, ...jobData });
        });

        return jobs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

const searchUsers = async (search) => {
    try {
        const snapshot = await db.collection('users').where('fullname', '>=', search).get();
        const fetchedUsers = snapshot.docs.map(doc => doc.data());
        return fetchedUsers;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};


const createPost = async (title, subheading, description, imageUri) => {
    try {
        // Retrieve the user's profile ID from AsyncStorage
        const profileId = await AsyncStorage.getItem('profileId');

        if (!profileId) {
            throw new Error('Profile ID not found in AsyncStorage');
        }

        // Get a reference to the "Posts" collection
        const postsCollectionRef = collection(db, 'Posts');

        // Calculate the current date and time
        const timestamp = serverTimestamp();

        // Upload the image to Firebase Storage
        const imageFileName = `post_${Date.now()}`;
        const storageRef = ref(storage, imageFileName);
        
        // Determine the content type of the image based on its file extension
        const contentType = imageUri.endsWith('.png') ? 'image/png' : 'image/jpeg';
        
        // Convert the imageUri to bytes
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload the image bytes to Firebase Storage with the determined content type
        await uploadBytes(storageRef, blob, { contentType });

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        // Add a new document to the "Posts" collection with the provided post details
        const docRef = await addDoc(postsCollectionRef, {
            title: title,
            subheading: subheading,
            description: description,
            imageUrl: imageUrl, // Store the download URL of the image
            createdAt: timestamp,
        });

        console.log("Post added with ID: ", docRef.id);

        // Get a reference to the user document in the "users" collection
        const userDocRef = doc(db, "users", profileId);

        // Update the user's profile with the newly created post document ID
        await updateDoc(userDocRef, {
            Posts: arrayUnion(docRef.id) // Add the new post document ID to the "Posts" array field in the user's profile
        });

        console.log("Post ID added to user's profile");

        return docRef.id; // Return the ID of the newly added post document
    } catch (error) {
        console.error("Error creating post: ", error);
        throw error; // Throw the error for handling in the calling function
    }
};

const fetchPostById = async (postId) => {
    try {
        // Get a reference to the post document in Firestore
        const postDocRef = doc(db, 'Posts', postId);
        
        // Fetch the post document from Firestore
        const postDocSnapshot = await getDoc(postDocRef);

        // Check if the document exists
        if (postDocSnapshot.exists()) {
            // Extract post data from the document snapshot
            const postData = postDocSnapshot.data();
            
            // Get the download URL of the image associated with the post
            const imageUrl = await getDownloadURL(ref(storage, postData.imageUrl));
            
            // Return the post data along with the image URL
            return {...postData, imageUrl };
        } else {
            console.log('Post document does not exist');
            return null;
        }
    } catch (error) {
        console.error('Error fetching post data:', error);
        throw error;
    }
};


export { signUpUser, fetchUserProfile, logInUser, addJobToFirestore, fetchAllJobs, searchUsers, createPost, fetchPostById };
