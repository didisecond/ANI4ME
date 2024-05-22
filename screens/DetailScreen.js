import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
    const { anime } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nombre: {anime.name}</Text>
            <Text style={styles.description}>Descripción: {anime.description}</Text>
            {/* Agrega más detalles según tu API */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 20,
    },
});
