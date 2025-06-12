import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const WorkoutDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { workout } = route.params;

  if (!workout) {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: 'Detalhes do treino não encontrados.',
    });
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Treino não disponível.</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const navigateToEdit = () => {
    navigation.navigate('Criar Treino', { workoutToEdit: workout });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
              <FontAwesome5 name="arrow-left" size={24} color="#32CD32" />
            </TouchableOpacity>
            <Text style={styles.title}>{workout.name}</Text>
            <TouchableOpacity onPress={navigateToEdit} style={styles.editIcon}>
              <FontAwesome5 name="edit" size={24} color="#ADD8E6" />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.infoLabel}>Data:</Text>
            <Text style={styles.infoValue}>{workout.date}</Text>
            <Text style={styles.infoLabel}>Volume Total:</Text>
            <Text style={styles.infoValue}>{workout.volume.toFixed(2)} kg</Text>
          </View>

          <Text style={styles.sectionTitle}>Exercícios</Text>
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id || index} style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              {exercise.sets.map((set, setIndex) => (
                <View key={set.id || setIndex} style={styles.setRow}>
                  <Text style={styles.setInfo}>Série {setIndex + 1}:</Text>
                  <Text style={styles.setInfo}>{set.reps} reps</Text>
                  <Text style={styles.setInfo}>{set.load} kg</Text>
                  {set.completed && <FontAwesome5 name="check-circle" size={18} color="#32CD32" style={styles.completedIcon} />}
                </View>
              ))}
            </View>
          ))}
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
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  backIcon: {
    padding: 5,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#32CD32',
    flex: 1,
    textAlign: 'center',
  },
  editIcon: {
    padding: 5,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '95%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#222',
  },
  infoLabel: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 18,
    color: '#ADD8E6',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  exerciseCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '95%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#222',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#282828',
    borderRadius: 5,
  },
  setInfo: {
    fontSize: 16,
    color: '#CCC',
  },
  completedIcon: {
    marginLeft: 10,
  },
  errorText: {
    color: '#FF6347',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default WorkoutDetailScreen;
