import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import backgroundImage from '../assets/portada1.jpg';

const API_URL = 'http://192.168.1.131:3000/api';

export default function LoginScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los usuarios:', error);
            });
    }, []);

    const handleLogin = () => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            Alert.alert('Inicio de sesión exitoso', `Bienvenido ${user.name}`);
            navigation.navigate('Home', { user });
        } else {
            Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
        }
    };

    const handleRegister = () => {
        axios.post(`${API_URL}/users`, { name, email, password })
            .then(response => {
                Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
                setIsRegistering(false);
            })
            .catch(error => {
                Alert.alert('Error', 'No se pudo registrar. Inténtalo de nuevo');
            });
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>{isRegistering ? 'Registro' : 'Inicio de Sesión'}</Text>
                    {isRegistering && (
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            value={name}
                            onChangeText={setName}
                        />
                    )}
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
                </ScrollView>
            </KeyboardAvoidingView>
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
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
});
