import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LogScreen/loginScreen';
import SignupScreen from './Screens/LogScreen/signupScreen';
import ForgatScreen from './Screens/LogScreen/ForgatScreen';
import OTPScreen from './Screens/LogScreen/OTPScreen';
import TimerScreen from './Screens/generateScreen/TimerScreen';
import Location from './Screens/getlocation/getlocation';

const Stack = createStackNavigator(); // Create a stack navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Location"> 
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forgat" component={ForgatScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTP" component={OTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
