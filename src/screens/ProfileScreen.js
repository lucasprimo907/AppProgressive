import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { signOut } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('registered_user');
        const storedEmail = await AsyncStorage.getItem('user_email') || 'usuario@exemplo.com';
        const storedWeight = await AsyncStorage.getItem('user_weight') || '75';
        const storedHeight = await AsyncStorage.getItem('user_height') || '175';

        setUserName(storedUsername || 'Usuário Padrão');
        setUserEmail(storedEmail);
        setUserWeight(storedWeight);
        setUserHeight(storedHeight);

      } catch (e) {
        console.error("Failed to load profile data from storage", e);
      }
    };
    loadProfileData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      await AsyncStorage.setItem('registered_user', userName);
      await AsyncStorage.setItem('user_email', userEmail);
      await AsyncStorage.setItem('user_weight', userWeight);
      await AsyncStorage.setItem('user_height', userHeight);

      Toast.show({
        type: 'success',
        text1: 'Perfil Atualizado!',
        text2: 'Seus dados foram salvos.',
      });
      setIsEditing(false);
    } catch (e) {
      console.error("Failed to save profile data", e);
      Toast.show({
        type: 'error',
        text1: 'Erro ao Salvar',
        text2: 'Não foi possível salvar o perfil.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Meu Perfil</Text>

          <View style={styles.profileCard}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Nome de Usuário:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editableInput}
                  value={userName}
                  onChangeText={setUserName}
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.value}>{userName}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editableInput}
                  value={userEmail}
                  onChangeText={setUserEmail}
                  keyboardType="email-address"
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.value}>{userEmail}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Peso (kg):</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editableInput}
                  value={userWeight}
                  onChangeText={setUserWeight}
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.value}>{userWeight} kg</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Altura (cm):</Text>
              {isEditing ? (
                <TextInput
                  style={styles.editableInput}
                  value={userHeight}
                  onChangeText={setUserHeight}
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                />
              ) : (
                <Text style={styles.value}>{userHeight} cm</Text>
              )}
            </View>

            {isEditing ? (
              <TouchableOpacity style={styles.editButton} onPress={handleSaveProfile}>
                <Text style={styles.editButtonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.logoutButtonText}>Sair do Aplicativo</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    width: '95%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  profileCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#222',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  label: {
    fontSize: 16,
    color: '#AAA',
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#FFF',
    flex: 2,
    textAlign: 'right',
  },
  editableInput: {
    flex: 2,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'right',
    borderWidth: 1,
    borderColor: '#555',
  },
  editButton: {
    backgroundColor: '#0a0a0a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  editButtonText: {
    color: '#32CD32',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#CC3300',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
