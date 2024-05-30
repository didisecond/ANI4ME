// screens/FavoriteAndFollowedScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backgroundImage from '../assets/portada1.jpg';

export default function FavoriteAndFollowedScreen({ navigation }) {
    const [followedAnimes, setFollowedAnimes] = useState([]);
    const [favoriteAnimes, setFavoriteAnimes] = useState([]);

    useEffect(() => {
        loadFollowedAnimes();
        loadFavoriteAnimes();
    }, []);

    const loadFollowedAnimes = async () => {
        const followed = JSON.parse(await AsyncStorage.getItem('followedAnimes')) || [];
        setFollowedAnimes(followed);
    };

    const loadFavoriteAnimes = async () => {
        const favorites = JSON.parse(await AsyncStorage.getItem('favoriteAnimes')) || [];
        setFavoriteAnimes(favorites);
    };

    return (
        <ImageBackground 
            source={backgroundImage}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Animes Seguidos</Text>
                <FlatList
                    data={followedAnimes}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnimeDetails', { anime: item })}>
                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                        </TouchableOpacity>
                    )}
                />
                <Text style={styles.sectionTitle}>Animes Favoritos</Text>
                <FlatList
                    data={favoriteAnimes}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnimeDetails', { anime: item })}>
                            <Text style={styles.cardTitle}>{item.titulo}</Text>
                        </TouchableOpacity>
                    )}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#fff',
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
