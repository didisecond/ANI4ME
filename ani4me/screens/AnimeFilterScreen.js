// screens/AnimeFilterScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.131:3000/api';

export default function AnimeFilterScreen({ navigation }) {
    const [animes, setAnimes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/animes`)
            .then(response => {
                setAnimes(response.data);
                const allGenres = response.data.map(anime => anime.genero).flat();
                setGenres([...new Set(allGenres)]);
            })
            .catch(error => {
                console.error('Error al obtener los animes:', error);
            });
    }, []);

    const filteredAnimes = animes.filter(anime => {
        const matchesGenre = selectedGenre ? anime.genero.includes(selectedGenre) : true;
        const matchesSearch = anime.titulo.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesGenre && matchesSearch;
    });

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar por título"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={genres}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[styles.genreButton, selectedGenre === item && styles.selectedGenreButton]} 
                        onPress={() => setSelectedGenre(item)}
                    >
                        <Text style={styles.genreButtonText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
            <FlatList
                data={filteredAnimes}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>{item.titulo}</Text>
                        <Text style={styles.cardSubtitle}>{item.genero.join(', ')}</Text>
                        <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('AnimeDetails', { anime: item })}>
                            <Text style={styles.cardButtonText}>Ver Detalles</Text>
                        </TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={styles.cardList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    genreButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    selectedGenreButton: {
        backgroundColor: '#999',
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
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    cardButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
