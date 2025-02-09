import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import ComponentPage from './pages/ComponentPage';
import Colors from './constants/colors';
import React from 'react';
import { StatusBar } from 'react-native';
import QueryProvider from './context/QueryProvider';
import MangaList from './pages/MangaList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <QueryProvider>
        <StatusBar hidden={false} backgroundColor={Colors.background} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomePage}
            />
            <Stack.Screen
              name="Components"
              component={ComponentPage}
            />
            <Stack.Screen
              name="MangaList"
              component={MangaList}
            />
            {/* <Stack.Screen
              name="MangaPage"
              component={MangaPage}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </QueryProvider>
    </>
  );
}
