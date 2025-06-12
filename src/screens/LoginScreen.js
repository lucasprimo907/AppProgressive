
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Toast.show({
        type: 'info',
        text1: 'Campos Vazios',
        text2: 'Por favor, preencha o nome de usuário e a senha.',
      });
      return;
    }

    try {
      await AsyncStorage.setItem('user_token', 'dummy-auth-token');
      signIn();
      Toast.show({
        type: 'success',
        text1: 'Login Bem-sucedido!',
        text2: 'Bem-vindo de volta.',
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro de Login',
        text2: 'Não foi possível fazer login. Tente novamente.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Progressive</Text>

            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.linkText}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 10,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    width: '95%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#222',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#555',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  buttonText: {
    color: '#32CD32',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#ADD8E6',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
