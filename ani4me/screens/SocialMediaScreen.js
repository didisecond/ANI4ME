// screens/SocialMediaScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import backgroundImage from '../assets/portada1.jpg';

const socialMediaLinks = {
    Instagram: 'https://www.instagram.com/',
    Twitter: 'https://www.twitter.com/',
    Facebook: 'https://www.facebook.com/',
    Reddit: 'https://www.reddit.com/',
};

export default function SocialMediaScreen() {
    const handlePress = (url) => {
        Linking.openURL(url);
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.container}>
                {Object.keys(socialMediaLinks).map((platform) => (
                    <TouchableOpacity 
                        key={platform} 
                        style={styles.button} 
                        onPress={() => handlePress(socialMediaLinks[platform])}
                    >
                        <FontAwesome name={platform.toLowerCase()} size={24} color="white" />
                        <Text style={styles.buttonText}>{platform}</Text>
                    </TouchableOpacity>
                ))}
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
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b5998',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        justifyContent: 'center',
        opacity: 0.8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
});
