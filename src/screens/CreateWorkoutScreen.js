import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const CreateWorkoutScreen = () => {
  const navigation = useNavigation();
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '', weight: '' }]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const removeExercise = (indexToRemove) => {
    setExercises(exercises.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveWorkout = async () => {
    if (!workoutName.trim()) {
      Toast.show({ type: 'info', text1: 'Nome do Treino Vazio', text2: 'Por favor, dê um nome ao seu treino.' });
      return;
    }

    const hasEmptyExercise = exercises.some(ex => !ex.name.trim() || !ex.sets.trim() || !ex.reps.trim() || !ex.weight.trim());
    if (hasEmptyExercise) {
      Toast.show({ type: 'info', text1: 'Exercícios Incompletos', text2: 'Por favor, preencha todos os campos dos exercícios.' });
      return;
    }

    try {
      const newWorkout = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        name: workoutName,
        details: exercises.map(ex => `${ex.name}: ${ex.sets}x${ex.reps} (${ex.weight}kg)`),
      };

      const storedWorkoutsJson = await AsyncStorage.getItem('workouts');
      let workouts = storedWorkoutsJson ? JSON.parse(storedWorkoutsJson) : [];

      workouts.unshift(newWorkout);

      await AsyncStorage.setItem('workouts', JSON.stringify(workouts));

      Toast.show({ type: 'success', text1: 'Treino Salvo!', text2: 'Seu treino foi registrado com sucesso.' });

      setWorkoutName('');
      setExercises([{ name: '', sets: '', reps: '', weight: '' }]);
      navigation.navigate('HistóricoTab');

    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Toast.show({ type: 'error', text1: 'Erro ao Salvar Treino', text2: 'Não foi possível registrar o treino.' });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <Text style={styles.title}>Criar Novo Treino</Text>

            <View style={styles.sectionCard}>
              <TextInput style={styles.input} placeholder="Nome do Treino (ex: Treino de Peito e Tríceps)" placeholderTextColor="#888" value={workoutName} onChangeText={setWorkoutName} />
            </View>

            {exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <Text style={styles.exerciseTitle}>Exercício {index + 1}</Text>
                <TextInput style={styles.input} placeholder="Nome do Exercício" placeholderTextColor="#888" value={exercise.name} onChangeText={(text) => updateExercise(index, 'name', text)} />
                <View style={styles.exerciseRow}>
                  <TextInput style={[styles.input, styles.smallInput]} placeholder="Séries" placeholderTextColor="#888" keyboardType="numeric" value={exercise.sets} onChangeText={(text) => updateExercise(index, 'sets', text)} />
                  <TextInput style={[styles.input, styles.smallInput]} placeholder="Repetições" placeholderTextColor="#888" keyboardType="numeric" value={exercise.reps} onChangeText={(text) => updateExercise(index, 'reps', text)} />
                  <TextInput style={[styles.input, styles.smallInput]} placeholder="Peso (kg)" placeholderTextColor="#888" keyboardType="numeric" value={exercise.weight} onChangeText={(text) => updateExercise(index, 'weight', text)} />
                </View>
                {exercises.length > 1 && (
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeExercise(index)}>
                    <Text style={styles.removeButtonText}>Remover Exercício</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity style={styles.addExerciseButton} onPress={addExercise}>
              <Text style={styles.addExerciseButtonText}>Adicionar Exercício</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveWorkoutButton} onPress={handleSaveWorkout}>
              <Text style={styles.saveWorkoutButtonText}>Salvar Treino</Text>
            </TouchableOpacity>
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
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#32CD32', 
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: '#1a1a1a', 
    borderRadius: 10,
    padding: 15,
    width: '95%',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 1,
    borderColor: '#222',
  },
  exerciseCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    width: '95%',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderWidth: 1,
    borderColor: '#222',
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallInput: {
    width: '32%', 
    height: 45,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#555',
  },
  addExerciseButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '95%',
    alignItems: 'center',
  },
  addExerciseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveWorkoutButton: {
    backgroundColor: '#0a0a0a',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '95%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  saveWorkoutButtonText: {
    color: '#32CD32',
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF6347', 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  removeButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CreateWorkoutScreen;
