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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig"

const db = getFirestore(); // Get reference to Firestore instance

const signUpUser = async (email, password, fullname, age, role) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
        console.log(userId);
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

// Function to fetch user data from Firestore
const fetchUserProfile = async () => {
    try {
        // Retrieve the user ID from AsyncStorage
        const userId = await AsyncStorage.getItem('profileId');
        console.log("Auth is :- " + auth);
        console.log(userId);
        if (userId) {
            // Get a reference to the user document in Firestore
            const userDocRef = doc(db, "users", userId);

            // Fetch the user document from Firestore
            const userDocSnapshot = await getDoc(userDocRef);

            // Check if the document exists
            if (userDocSnapshot.exists()) {
                // Extract user data from the document snapshot
                const userData = userDocSnapshot.data();
                console.log('User Data:', userData);
                return userData; // Return the user data
            } else {
                console.log('User document does not exist');
                return null;
            }
        } else {
            console.log('User ID not found in AsyncStorage');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return error.message;
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
            // Extract the data from each document
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


export { signUpUser, fetchUserProfile, logInUser, addJobToFirestore, fetchAllJobs, searchUsers };
