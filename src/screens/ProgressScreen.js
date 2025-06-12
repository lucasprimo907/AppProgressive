import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const progressData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(50, 205, 50, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Seu Progresso</Text>

          {/* Cartão de Visão Geral do Progresso */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Visão Geral</Text>
            <View style={styles.overviewRow}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewValue}>+15%</Text>
                <Text style={styles.overviewLabel}>Aumento de Força (Supino)</Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewValue}>+10kg</Text>
                <Text style={styles.overviewLabel}>Peso Máximo (Agachamento)</Text>
              </View>
            </View>
          </View>

          {/* Gráfico de Volume de Treino (Exemplo, requer biblioteca de gráficos) */}
          {/* Se você instalou 'react-native-chart-kit'
          <View style={styles.chartCard}>
            <Text style={styles.sectionTitle}>Volume de Treino Mensal</Text>
            <LineChart
              data={progressData}
              width={width * 0.85}
              height={220}
              chartConfig={{
                backgroundColor: '#1a1a1a',
                backgroundGradientFrom: '#1a1a1a',
                backgroundGradientTo: '#1a1a1a',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#32CD32',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          */}

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Estatísticas de Força</Text>
            <Text style={styles.statText}>Supino Reto: Recorde de 80kg (3x6)</Text>
            <Text style={styles.statText}>Agachamento: Recorde de 100kg (3x5)</Text>
            <Text style={styles.statText}>Remada Curvada: Recorde de 60kg (3x8)</Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Metas e Conquistas</Text>
            <Text style={styles.statText}>Meta atual: Atingir 90kg no agachamento.</Text>
            <Text style={styles.statText}>Conquistas: 50 treinos completos!</Text>
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
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#32CD32',
    marginBottom: 30,
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
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  overviewItem: {
    alignItems: 'center',
    flex: 1,
  },
  overviewValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#222',
  },
  statText: {
    fontSize: 16,
    color: '#DDD',
    marginBottom: 8,
  },
});

export default ProgressScreen;
