// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import AnimeSearchScreen from './screens/AnimeSearchScreen';
import AnimeGenreFilterScreen from './screens/AnimeGenreFilterScreen';
import AnimeDetailsScreen from './screens/AnimeDetailsScreen';
import SocialMediaScreen from './screens/SocialMediaScreen';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="AnimeSearch" component={AnimeSearchScreen} />
                <Stack.Screen name="AnimeGenreFilter" component={AnimeGenreFilterScreen} />
                <Stack.Screen name="AnimeDetails" component={AnimeDetailsScreen} />
                <Stack.Screen name="SocialMedia" component={SocialMediaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
