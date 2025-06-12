import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);
  const [userName, setUserName] = useState('Lucas'); 

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('registered_user');
        if (storedUser) {
          setUserName(storedUser);
        }
      } catch (e) {
        console.error("Failed to load username from storage", e);
      }
    };
    loadUserName();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.greeting}>Olá, {userName}!</Text>

          {/* Seção Resumo do Treino */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Resumo do Treino</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>15</Text>
                <Text style={styles.summaryLabel}>Treinos Completos</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryValue}>2500 kg</Text>
                <Text style={styles.summaryLabel}>Volume Total Levantado</Text>
              </View>
            </View>
          </View>

          {/* Seção Último Treino */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Último Treino</Text>
            <View style={styles.lastWorkoutContent}>
              <Text style={styles.workoutName}>Treino de Peito e Tríceps</Text>
              <Text style={styles.workoutDate}>24 de Maio, 2025</Text>
              <Text style={styles.workoutDetails}>Supino Reto: 3x8 (60kg)</Text>
              <Text style={styles.workoutDetails}>Crucifixo: 3x12 (15kg)</Text>
              <Text style={styles.workoutDetails}>Tríceps Testa: 3x10 (20kg)</Text>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsButtonText}>Ver Detalhes</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Seção Ações Rápidas */}
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Criar Treino')}>
              <Text style={styles.actionButtonText}>Criar Novo Treino</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('HistóricoTab')}>
              <Text style={styles.actionButtonText}>Ver Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Progresso')}>
              <Text style={styles.actionButtonText}>Acompanhar Progresso</Text>
            </TouchableOpacity>
          </View>

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
  greeting: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 30,
    alignSelf: 'flex-start',
    marginLeft: '2.5%',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  sectionCard: {
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
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
  },
  lastWorkoutContent: {
  
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  workoutDate: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 10,
  },
  workoutDetails: {
    fontSize: 16,
    color: '#DDD',
    marginBottom: 3,
  },
  viewDetailsButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  viewDetailsButtonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#0a0a0a',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  actionButtonText: {
    color: '#32CD32',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#CC3300',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
