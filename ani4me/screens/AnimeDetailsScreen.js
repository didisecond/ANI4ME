// screens/AnimeDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function AnimeDetailsScreen({ route }) {
    const { anime } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: anime.portada }} style={styles.image} />
            <Text style={styles.title}>{anime.titulo}</Text>
            <Text style={styles.description}>{anime.descripcion}</Text>
            <Text style={styles.genre}>{anime.genero.join(', ')}</Text>
            <Text style={styles.rating}>Calificación: {anime.calificacion}</Text>
            <Text style={styles.date}>Fecha de lanzamiento: {new Date(anime.fechaDeLanzamiento).toLocaleDateString()}</Text>
            <Text style={styles.status}>En emisión: {anime.enEmision ? 'Sí' : 'No'}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
