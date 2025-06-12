import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async () => {
    setUserToken('dummy-auth-token');
    await AsyncStorage.setItem('user_token', 'dummy-auth-token');
  };

  const signOut = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem('user_token');
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('user_token');
      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.error('Erro ao verificar status de login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
