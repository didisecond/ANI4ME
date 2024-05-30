// screens/AnimeGenreFilterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import axios from 'axios';
import backgroundImage from '../assets/portada1.jpg';
import { API_URL } from '../config';

const genresList = [
    'Accion', 'Aventura', 'Sobrenatural', 'Drama', 'Mecha', 'Romance', 'Slice of Life',
    'Ciencia Ficcion', 'Horror', 'Fantasia', 'Comedia', 'Superpoderes', 'Deportes',
    'Misterio', 'Psicologico', 'Magia', 'Musica', 'Demonios', 'Escolar', 'Ecchi', 
    'Thriller', 'Viajes en el Tiempo'
];

export default function AnimeGenreFilterScreen({ navigation }) {
    const [animes, setAnimes] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/animes`)
            .then(response => {
                setAnimes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los animes:', error);
            });
    }, []);

    const handleGenrePress = (genre) => {
        setSelectedGenre(genre);
    };

    const filteredAnimes = animes.filter(anime => {
        return selectedGenre ? anime.genero.includes(selectedGenre) : true;
    });

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList}>
                    {genresList.map((genre, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[styles.genreButton, selectedGenre === genre && styles.selectedGenreButton]} 
                            onPress={() => handleGenrePress(genre)}
                        >
                            <Text style={styles.genreButtonText}>{genre}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <FlatList
                    data={filteredAnimes}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnimeDetails', { anime: item })}>
                            <Image source={{ uri: item.portada }} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={styles.cardList}
                    ListEmptyComponent={<Text style={styles.emptyText}>No animes found</Text>}
                />
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
        padding: 20,
    },
    genreList: {
        marginBottom: 10, 
    },
    genreButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
        marginVertical: 5, 
        opacity: 0.8, 
    },
    selectedGenreButton: {
        backgroundColor: '#999',
        opacity: 1, 
    },
    genreButtonText: {
        color: '#fff',
    },
    cardList: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        alignItems: 'center',
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#999',
    },
});
