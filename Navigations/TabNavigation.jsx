// import React from 'react';
// import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { AntDesign } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Home, Login, Signup, Welcome, Job, Search, Profile, Post } from '../Screens';


// const Tab = createBottomTabNavigator();

// const screenOptions = {
//   tabBarShowLabel: false,
//   headerShown: false,
//   tabBarStyle: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     left: 0,
//     elevation: 0,
//     height: 60,
//     background: "#fff"
//   }
// }


// export default function TabNavigation() {
//   return (
//     <Tab.Navigator screenOptions={screenOptions}>
//       <Tab.Screen name="Home" component={Home}
//       // <Tab.Screen name="Home" component={HomeScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           )
//         }}
//       />
//       <Tab.Screen name="Add" component={Login}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="pluscircle" size={size} color={color} />
//           )
//         }}
//       />
//       <Tab.Screen name="Profile" component={Search}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <FontAwesome name="user" size={size} color={color} />
//           )
//         }} />
//       {/* <Tab.Screen name="OnBoarding" component={OnBoardingScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           )
//         }}
//       /> */}

//     </Tab.Navigator>
//   )
// }