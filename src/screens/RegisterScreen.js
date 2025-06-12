// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      Toast.show({
        type: 'info',
        text1: 'Campos Vazios',
        text2: 'Por favor, preencha todos os campos.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Senhas Diferentes',
        text2: 'As senhas não coincidem. Tente novamente.',
      });
      return;
    }

    try {
      await AsyncStorage.setItem('registered_user', username);
      await AsyncStorage.setItem('registered_pass', password);

      Toast.show({
        type: 'success',
        text1: 'Registro Bem-sucedido!',
        text2: 'Você já pode fazer login.',
      });
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro no Registro',
        text2: 'Não foi possível registrar. Tente novamente.',
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
            <Text style={styles.title}>Cadastre-se</Text>

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
              <TextInput
                style={styles.input}
                placeholder="Confirme a Senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.linkText}>Já tem uma conta? Entrar</Text>
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
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 40,
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

export default RegisterScreen;