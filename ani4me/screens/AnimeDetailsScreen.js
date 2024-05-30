// screens/AnimeDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backgroundImage from '../assets/descarga.jpg';  // Asegúrate de tener esta imagen en tu directorio de assets

export default function AnimeDetailsScreen({ route }) {
    const { anime, isLoggedIn } = route.params;
    const [followed, setFollowed] = useState(false);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        checkFollowed();
        checkFavorited();
    }, []);

    const checkFollowed = async () => {
        const followedAnimes = JSON.parse(await AsyncStorage.getItem('followedAnimes')) || [];
        setFollowed(followedAnimes.some(a => a._id === anime._id));
    };

    const checkFavorited = async () => {
        const favoriteAnimes = JSON.parse(await AsyncStorage.getItem('favoriteAnimes')) || [];
        setFavorited(favoriteAnimes.some(a => a._id === anime._id));
    };

    const toggleFollowed = async () => {
        let followedAnimes = JSON.parse(await AsyncStorage.getItem('followedAnimes')) || [];
        if (followed) {
            followedAnimes = followedAnimes.filter(a => a._id !== anime._id);
        } else {
            followedAnimes.push(anime);
        }
        await AsyncStorage.setItem('followedAnimes', JSON.stringify(followedAnimes));
        setFollowed(!followed);
        Alert.alert('Seguimiento actualizado', `Anime ${followed ? 'eliminado de' : 'añadido a'} seguimiento.`);
    };

    const toggleFavorited = async () => {
        let favoriteAnimes = JSON.parse(await AsyncStorage.getItem('favoriteAnimes')) || [];
        if (favorited) {
            favoriteAnimes = favoriteAnimes.filter(a => a._id !== anime._id);
        } else {
            favoriteAnimes.push(anime);
        }
        await AsyncStorage.setItem('favoriteAnimes', JSON.stringify(favoriteAnimes));
        setFavorited(!favorited);
        Alert.alert('Favoritos actualizado', `Anime ${favorited ? 'eliminado de' : 'añadido a'} favoritos.`);
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={{ uri: anime.portada }} style={styles.image} />
                <Text style={styles.title}>{anime.titulo}</Text>
                <Text style={styles.description}>{anime.descripcion}</Text>
                <Text style={styles.genre}>{anime.genero.join(', ')}</Text>
                <Text style={styles.rating}>Calificación: {anime.calificacion}</Text>
                <Text style={styles.date}>Fecha de lanzamiento: {new Date(anime.fechaDeLanzamiento).toLocaleDateString()}</Text>
                <Text style={styles.status}>En emisión: {anime.enEmision ? 'Sí' : 'No'}</Text>
                <Button title={followed ? "Dejar de seguir" : "Seguir"} onPress={toggleFollowed} />
                <Button title={favorited ? "Eliminar de favoritos" : "Añadir a favoritos"} onPress={toggleFavorited} />
            </ScrollView>
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
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    genre: {
        fontSize: 16,
        marginBottom: 10,
        fontStyle: 'italic',
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
    },
    date: {
        fontSize: 16,
        marginBottom: 10,
    },
    status: {
        fontSize: 16,
        marginBottom: 10,
    },
});
