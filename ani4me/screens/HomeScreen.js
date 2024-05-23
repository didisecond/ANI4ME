// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

// Importar la imagen de fondo
import backgroundImage from '../assets/portada1.jpg';

export default function HomeScreen({ navigation }) {
    return (
        <ImageBackground 
            source={backgroundImage}
            style={styles.background}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AnimeFilter')}>
                    <Text style={styles.buttonText}>Filtrar Animes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login / Crear Cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SocialMedia')}>
                    <Text style={styles.buttonText}>Redes Sociales</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Favorites')}>
                    <Text style={styles.buttonText}>Mis Animes Favoritos</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#000000aa',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});