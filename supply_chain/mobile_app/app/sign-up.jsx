import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        dateOfBirth: '',
    });

    const submit = () => {
        Alert.alert('Sign-Up', `Name: ${form.name}\nPhone: ${form.phoneNumber}\nEmail: ${form.email}`, [
            { text: 'OK', onPress: () => console.log('Form Submitted') },
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.innerContainer}>
                    <Image
                        source={{ uri: 'https://example.com/logo.png' }} // Replace with a local or online image
                        resizeMode="contain"
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Join Our App</Text>
                </View>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Name"
                        value={form.name}
                        onChangeText={(text) => setForm({ ...form, name: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                        style={styles.input}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        placeholder="Date of Birth"
                        value={form.dateOfBirth}
                        onChangeText={(text) => setForm({ ...form, dateOfBirth: text })}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Email"
                        value={form.email}
                        onChangeText={(text) => setForm({ ...form, email: text })}
                        style={styles.input}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>Sign-up</Text>
                    </TouchableOpacity>
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>Have an account already?</Text>
                        <Link href="/sign-in">
                            <Text style={styles.link}>Sign-in</Text>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '20%',
        marginBottom: 20,
    },
    logo: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 10,
        color: '#333',
    },
    formContainer: {
        paddingHorizontal: 15,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#333',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    linkText: {
        fontSize: 16,
        color: '#333',
    },
    link: {
        fontSize: 16,
        color: '#007BFF',
        marginLeft: 5,
    },
});

export default SignUp;
