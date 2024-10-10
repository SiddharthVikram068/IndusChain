import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native'; // Import Lottie for animations
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router'; // Ensure you're using useRouter for navigation
import { RadioButton } from 'react-native-paper';
import { createUser } from '../../lib/appwrite';
import {router} from 'expo-router';
const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        dateOfBirth: '',
        password: '',
        userType: 'USER',
    });

    const animation = useRef(null);
    const router = useRouter(); // Using useRouter hook for navigation

    const handleUserTypeChange = (value) => {
        setForm({ ...form, userType: value });
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        setIsSubmitting(true);
        let attempts = 0;
        const maxAttempts = 5;
        const delay = 1000; // Initial delay in ms
    
        while (attempts < maxAttempts) {
            try {
                const result = await createUser(form.email, form.password, form.username);
                router.replace('/web3/wallet_connect');
                break; // Exit loop on success
            } catch (error) {
                if (error.message.includes('Rate limit')) {
                    attempts++;
                    console.warn(`Rate limit exceeded. Retrying in ${delay * attempts}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay * attempts)); // Wait before retrying
                } else {
                    Alert.alert('Error', error.message);
                    break; // Exit loop on other errors
                }
            }
        }
        setIsSubmitting(false);
    };
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.innerContainer}>
                    {/* Lottie Animation */}
                    {/* Uncomment this to use Lottie Animation */}
                    {/* <LottieView
                        ref={animation}
                        source={require('../../assets/videos/loginsignin.json')}
                        autoPlay
                        loop
                        style={styles.lottieAnimation}
                    /> */}
                    <Text style={styles.title}>Join The <Text style={styles.brownText}>CargoChain</Text></Text>
                </View>
                <View style={styles.formContainer}>
                    <FormField
                        title="Name"
                        value={form.username}
                        handleChangeText={(text) => setForm({ ...form, username: text })}
                        otherStyles={styles.formField}
                    />
                    <FormField
                        title="Registered Phone Number"
                        value={form.phoneNumber}
                        handleChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                        otherStyles={styles.formField}
                        keyboardType="phone-pad"
                    />
                    <FormField
                        title="Date Of Birth"
                        value={form.dateOfBirth}
                        handleChangeText={(text) => setForm({ ...form, dateOfBirth: text })}
                        otherStyles={styles.formField}
                        keyboardType="numeric"
                    />
                    <FormField
                        title="Registered Email"
                        value={form.email}
                        handleChangeText={(text) => setForm({ ...form, email: text })}
                        otherStyles={styles.formField}
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(text) => setForm({ ...form, password: text })}
                        otherStyles={styles.formField}
                        secureTextEntry={true} // To hide password input
                    />
                    <View style={styles.radioContainer}>
                        <Text style={styles.radioLabel}>Are you a:</Text>
                        <View style={styles.radioButtons}>
                            <View style={styles.radioButton}>
                                <RadioButton
                                    value="user"
                                    status={form.userType === 'USER' ? 'checked' : 'unchecked'}
                                    onPress={() => handleUserTypeChange('USER')}
                                />
                                <Text style={styles.radioLabel}>Distributor</Text>
                            </View>
                            <View style={styles.radioButton}>
                                <RadioButton
                                    value="driver"
                                    status={form.userType === 'DRIVER' ? 'checked' : 'unchecked'}
                                    onPress={() => handleUserTypeChange('DRIVER')}
                                />
                                <Text style={styles.radioLabel}>Verifier</Text>
                            </View>
                        </View>
                    </View>
                    <CustomButton
                        title="Sign up"
                        handlePress={submit}
                        containerStyles="w-full mt-7"
                        textStyles={{ color: '#000' }} // Black text for button
                    />
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>
                            Already have an account?
                        </Text>
                        <Link href="/sign-in" style={styles.link}>
                            <Text style={styles.signInText}>Sign in</Text>
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
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 100,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '15%',
        marginBottom: 9,
    },
    lottieAnimation: {
        width: 100,
        height: 140,
        marginBottom: 5,
    },
    title: {
        fontSize: 24,
        color: '#333',
        fontWeight: '600',
        marginTop: 10,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
    },
    brownText: {
        color: '#8B4513',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    formField: {
        marginVertical: 10,
    },
    button: {
        marginTop: 30,
        marginBottom: 30,
    },
    linkContainer: {
        justifyContent: 'center',
        paddingTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'Poppins-Regular',
    },
    signInText: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 6,
        color: '#8B4513',
    },
    radioContainer: {
        marginVertical: 10,
    },
    radioLabel: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 4,
    },
    radioButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
});

export default SignUp;
