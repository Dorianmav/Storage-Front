import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import ComponentPage from './pages/ComponentPage';
import Colors from './constants/colors';
import { StatusBar } from 'react-native';
import QueryProvider from './context/QueryProvider';
import MangaList from './pages/MangaList';
import MangaViewPage from './pages/MangaViewPage';
import { RootStackParamList } from './navigation/types';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';

const BottomTab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <StatusBar hidden={false} backgroundColor={Colors.background} />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MangaList" component={MangaList} />
            <Stack.Screen name="MangaDetails" component={MangaViewPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryProvider>
    </SafeAreaProvider>
  );
}

function Home() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 1,
          borderTopColor: Colors.neutral,
        },
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Components' ? 'appstore-o' : 'home';
          return <AntDesign name={iconName as keyof typeof AntDesign.glyphMap} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarLabel: 'Accueil',
        }}
      />
      <BottomTab.Screen
        name="Components"
        component={ComponentPage}
        options={{
          tabBarLabel: 'Composants',
        }}
      />
    </BottomTab.Navigator>
  );
}
