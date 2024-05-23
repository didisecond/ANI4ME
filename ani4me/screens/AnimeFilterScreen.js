// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AnimeFilterScreen from './screens/AnimeFilterScreen';
import LoginScreen from './screens/LoginScreen';
import SocialMediaScreen from './screens/SocialMediaScreen';
import FavoritesScreen from './screens/FavoritesScreen';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AnimeFilter" component={AnimeFilterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
