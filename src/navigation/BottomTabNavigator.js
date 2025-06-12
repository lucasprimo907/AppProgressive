import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import CreateWorkoutScreen from '../screens/CreateWorkoutScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Platform } from 'react-native'; 

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Criar Treino') {
            iconName = 'plus-square';
          } else if (route.name === 'HistóricoTab') {
            iconName = 'history';
          } else if (route.name === 'Progresso') {
            iconName = 'chart-line';
          } else if (route.name === 'Perfil') {
            iconName = 'user-alt';
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#32CD32',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 1,
          borderTopColor: '#222',
          elevation: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 25 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Criar Treino" component={CreateWorkoutScreen} />
      <Tab.Screen name="HistóricoTab" component={WorkoutHistoryScreen} options={{ title: 'Histórico' }} />
      <Tab.Screen name="Progresso" component={ProgressScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
