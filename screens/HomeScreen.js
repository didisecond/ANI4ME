import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia esto por la URL de tu servidor de API

export default function HomeScreen({ navigation }) {
    const [animes, setAnimes] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/animes`)
            .then(response => {
                setAnimes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los animes:', error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={animes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Button
                            title="Ver Detalles"
                            onPress={() => navigation.navigate('Details', { anime: item })}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    item: {
        marginBottom: 20,
    },
});
