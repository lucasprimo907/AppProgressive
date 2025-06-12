// src/screens/WorkoutHistoryScreen.js
import React, { useState, useEffect, useCallback } from 'react'; // <--- Adicionar useState, useEffect, useCallback
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'; // <--- Adicionar RefreshControl
import AsyncStorage from '@react-native-async-storage/async-storage'; // <--- IMPORTANTE: Importar AsyncStorage aqui
import { useFocusEffect } from '@react-navigation/native'; // <--- IMPORTANTE: Importar useFocusEffect aqui

const { width } = Dimensions.get('window');

const WorkoutHistoryScreen = () => {
  const [workouts, setWorkouts] = useState([]); // <--- Estado para armazenar os treinos carregados
  const [refreshing, setRefreshing] = useState(false); // Estado para o Pull-to-Refresh

  const loadWorkouts = useCallback(async () => { // <--- Função useCallback para carregar treinos
    try {
      setRefreshing(true); // Inicia o indicador de refresh
      const storedWorkoutsJson = await AsyncStorage.getItem('workouts');
      if (storedWorkoutsJson) {
        setWorkouts(JSON.parse(storedWorkoutsJson)); // Atualiza o estado com os treinos salvos
      } else {
        setWorkouts([]); // Se não houver treinos, define como array vazio
      }
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
      Toast.show({ type: 'error', text1: 'Erro ao Carregar Treinos', text2: 'Não foi possível carregar seu histórico.' });
    } finally {
      setRefreshing(false); // Finaliza o indicador de refresh
    }
  }, []); // Dependências vazias: a função não precisa ser recriada a menos que suas dependências mudem

  // Use useFocusEffect para carregar os treinos sempre que a tela for focada
  // (útil quando você volta para esta tela de outra, como após salvar um treino)
  useFocusEffect(
    useCallback(() => {
      loadWorkouts(); // Chama a função para carregar treinos
      return () => {
        // Opcional: fazer algo quando a tela perde o foco (ex: limpar estados)
      };
    }, [loadWorkouts]) // Depende de loadWorkouts
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={ // Adiciona funcionalidade de Pull-to-Refresh
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadWorkouts} // Chama loadWorkouts quando o usuário "puxa para atualizar"
            tintColor="#32CD32" // Cor do indicador de carregamento
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>Histórico de Treinos</Text>

          {workouts.length > 0 ? ( // Renderiza treinos se houver algum
            workouts.map((workout) => (
              <View key={workout.id} style={styles.workoutCard}>
                <Text style={styles.workoutDate}>{workout.date}</Text>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View style={styles.detailsContainer}>
                  {workout.details.map((detail, index) => (
                    <Text key={index} style={styles.workoutDetailItem}>
                      • {detail}
                    </Text>
                  ))}
                </View>
                {/* Você pode adicionar um botão para ver detalhes, editar ou excluir aqui */}
                <TouchableOpacity style={styles.viewDetailsButton}>
                  <Text style={styles.viewDetailsButtonText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : ( // Mensagem se não houver treinos
            <Text style={styles.noWorkoutsText}>Nenhum treino registrado ainda. Comece a criar um!</Text>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  scrollViewContent: { flexGrow: 1, alignItems: 'center', paddingVertical: 20 },
  container: { flex: 1, alignItems: 'center', padding: 20, width: '100%' },
  title: { fontSize: width * 0.08, fontWeight: 'bold', color: '#32CD32', marginBottom: 20 },
  workoutCard: { backgroundColor: '#1a1a1a', borderRadius: 10, padding: 15, width: '95%', marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, borderWidth: 1, borderColor: '#222' },
  workoutDate: { fontSize: 14, color: '#888', marginBottom: 5 },
  workoutName: { fontSize: 18, fontWeight: 'bold', color: '#FFF', marginBottom: 10 },
  detailsContainer: { marginBottom: 10 },
  workoutDetailItem: { fontSize: 14, color: '#EEE', lineHeight: 20 },
  viewDetailsButton: { backgroundColor: '#32CD32', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, alignSelf: 'flex-start', marginTop: 10 },
  viewDetailsButtonText: { color: '#FFF', fontWeight: 'bold' },
  noWorkoutsText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 50 },
});

export default WorkoutHistoryScreen;