// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.1.131:3000/api';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = () => {
        axios.post(`${API_URL}/users`, { email, password })
            .then(response => {
                Alert.alert('Login exitoso', `Bienvenido ${response.data.user.name}`);
                navigation.navigate('Home');
            })
            .catch(error => {
                Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
            });
    };

    const handleRegister = () => {
        axios.post(`${API_URL}/users`, { email, password })
            .then(response => {
                Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
                setIsRegistering(false);
            })
            .catch(error => {
                Alert.alert('Error', 'No se pudo registrar. Inténtalo de nuevo');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegistering ? 'Registro' : 'Inicio de Sesión'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {isRegistering ? (
                <Button title="Registrar" onPress={handleRegister} />
            ) : (
                <Button title="Iniciar Sesión" onPress={handleLogin} />
            )}
            <Button
                title={isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                onPress={() => setIsRegistering(!isRegistering)}
                color="#999"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
