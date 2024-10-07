import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handlePress = () => {
    // No actual backend logic, just a placeholder for UI interaction.
    Alert.alert('Sign-In', `Phone Number: ${phoneNumber}`, [
      { text: 'OK', onPress: () => router.push('/otp') },
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
          <Text style={styles.title}>Log-in to Our App</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Log-in</Text>
          </TouchableOpacity>
          <View style={styles.signUpLink}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Link href="/sign-up" style={styles.signUpLinkText}>
              Sign-up
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
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#333',
  },
  signUpLinkText: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 5,
  },
});

export default SignIn;
