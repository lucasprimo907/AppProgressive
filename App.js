// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <AuthProvider>
        <AuthNavigator />
      </AuthProvider>
      <Toast />
    </NavigationContainer>
  );
}