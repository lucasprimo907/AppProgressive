// src/navigation/AuthNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppTabs from './BottomTabNavigator';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#32CD32" />
      </View>
    );
  }

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <AuthStack.Screen name="AppTabs" component={AppTabs} />
      )}
    </AuthStack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default AuthNavigator;