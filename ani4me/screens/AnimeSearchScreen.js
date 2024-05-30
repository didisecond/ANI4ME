// screens/AnimeSearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import backgroundImage from '../assets/portada1.jpg';
import { API_URL } from '../config';

export default function AnimeSearchScreen({ navigation }) {
    const [animes, setAnimes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/animes`)
            .then(response => {
                setAnimes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los animes:', error);
            });
    }, []);

    const filteredAnimes = animes.filter(anime => 
        anime.titulo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Buscar por título"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
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
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
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
});
