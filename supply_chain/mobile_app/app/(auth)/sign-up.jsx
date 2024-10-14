import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import { createUser } from '../../lib/appwrite';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        dateOfBirth: '',
        password: '',
        userType: 'USER',
    });

    const router = useRouter(); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUserTypeChange = (value) => {
        setForm({ ...form, userType: value });
    };

    const submit = async () => {
        setIsSubmitting(true);
        let attempts = 0;
        const maxAttempts = 5;
        const delay = 1000;

        while (attempts < maxAttempts) {
            try {
                const result = await createUser(form.email, form.password, form.username);
                router.replace('/web3/wallet_connect');
                break;
            } catch (error) {
                if (error.message.includes('Rate limit')) {
                    attempts++;
                    console.warn(`Rate limit exceeded. Retrying in ${delay * attempts}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay * attempts));
                } else {
                    Alert.alert('Error', error.message);
                    break;
                }
            }
        }
        setIsSubmitting(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Join The <Text style={styles.brownText}>CargoChain</Text></Text>
                </View>
                <View style={styles.formContainer}>
                    {/* add user ico */}
                    <FormField
                        value={form.username}
                        placeholder="Enter your name"
                        handleChangeText={(text) => setForm({ ...form, username: text })}
                        icon="person" // User icon
                        otherStyles={styles.formField}
                    />
                    <FormField
                        value={form.phoneNumber}
                        placeholder="Enter your phone number"
                        handleChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                        icon="phone" // Phone icon
                        otherStyles={styles.formField}
                        keyboardType="phone-pad"
                    />
                    <FormField
                        value={form.dateOfBirth}
                        placeholder="DD/MM/YYYY"
                        handleChangeText={(text) => setForm({ ...form, dateOfBirth: text })}
                        icon="calendar-today" // Calendar icon
                        otherStyles={styles.formField}
                        keyboardType="numeric"
                    />
                    <FormField
                        value={form.email}
                        placeholder="Enter your email"
                        handleChangeText={(text) => setForm({ ...form, email: text })}
                        icon="email" // Email icon
                        otherStyles={styles.formField}
                        keyboardType="email-address"
                    />
                    <FormField
                        value={form.password}
                        placeholder="Create a password"
                        handleChangeText={(text) => setForm({ ...form, password: text })}
                        icon="lock" // Lock icon
                        otherStyles={styles.formField}
                        secureTextEntry={true}
                    />
                    <View style={styles.radioButtonContainer}>
                        <Text style={styles.radioTitle}>Select User Type</Text>
                        <View style={styles.radioOptionRow}>
                            <View style={styles.radioOption}>
                                <RadioButton
                                    value="user"
                                    status={form.userType === 'USER' ? 'checked' : 'unchecked'}
                                    onPress={() => handleUserTypeChange('USER')}
                                />
                                <Text style={styles.radioLabel}>Distributor</Text>
                            </View>
                            <View style={styles.radioOption}>
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
                        textStyles={{ color: '#000' }}
                        isLoading={isSubmitting}
                    />
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>Already have an account?</Text>
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
        paddingBottom: 100,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '15%',
        marginBottom: 9,
    },
    title: {
        fontSize: 40,
        color: '#333',
        fontWeight: '600',
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    brownText: {
        color: '#8B4513',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 30,
        elevation: 10,
        shadowColor: '#000',
    },
    formField: {
        borderRadius: 30,
        marginBottom: 20,
        fontFamily: 'Poppins-Bold',
        paddingVertical: 10,
        backgroundColor: '#f7f7f7', // Background color for form fields
        paddingHorizontal: 15, // Inner padding for form fields
    },
    radioButtonContainer: {
        marginVertical: 20,
    },
    radioTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#34495E',
        marginBottom: 10,
    },
    radioOptionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioLabel: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#000000',
    },
    linkContainer: {
        justifyContent: 'center',
        paddingTop: 20,
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
        fontFamily: 'Poppins-Bold',
        color: '#8B4513', // Color for the link
        marginLeft: 5,
    },
});

export default SignUp;
