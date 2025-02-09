import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import ComponentPage from './pages/ComponentPage';
import Colors from './constants/colors';
import React from 'react';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
