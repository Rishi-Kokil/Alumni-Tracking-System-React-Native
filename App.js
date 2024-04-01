import "./Firebase/FirebaseConfig.js"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QRCodeScannerScreen, Home, Login, Signup, Welcome, Job, Search, Profile, Post, Chat, JobApply, JobPost, Settings, MapScreen, QrCode } from './Screens';
import { AuthContextProvider } from './Context/AuthContext';
import { BottomNav } from './Components';
import { ThemeProvider } from "./Context/ThemeContext.jsx";

// console.log(process.env.FIREBASE_API_KEY);

const Stack = createNativeStackNavigator();

const ScreeOptions = {
  headerShown: false,
}

const animationOptions = {
  animation: 'fade',
  transitionSpec: {
    open: { animation: 'fade', config: { delay: 4000 } }, // Add a delay of 1000 milliseconds (1 second)
    close: { animation: 'fade' },
  },
}


export default function App() {

  return (
    <AuthContextProvider>
      <ThemeProvider>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" screenOptions={ScreeOptions} >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} options={animationOptions} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: true, title: "Alumni Tracking System" }} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Job" component={Job} />
            <Stack.Screen name="JobPost" component={JobPost} />
            <Stack.Screen name="JobApply" component={JobApply} />
            <Stack.Screen name="Qr" component={QrCode} options={{ headerShown: true, title: "Qr Code" }} />
            <Stack.Screen name="Post" component={Post} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: true, title: "Map" }} />
            <Stack.Screen name="Scan" component={QRCodeScannerScreen} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true, title: "Settings" }} />
          </Stack.Navigator>
          <BottomNav />
        </NavigationContainer>
      </ThemeProvider>
    </AuthContextProvider>
  );
}
