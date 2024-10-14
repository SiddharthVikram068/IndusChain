import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ImageBackground } from 'react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import { createUser } from '../../lib/appwrite';

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

    const handleUserTypeChange = (value) => {
        setForm({ ...form, userType: value });
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

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
            {/* <ImageBackground
                source={require('../../assets/images/bg_1.png')} 
                style={styles.backgroundImage}
            > */}
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.title}>Join The <Text style={styles.brownText}>CargoChain</Text></Text>
                    </View>
                    <View style={styles.formContainer}>
                        <FormField
                            value={form.username}
                            placeholder="Enter your name"
                            handleChangeText={(text) => setForm({ ...form, username: text })}
                            otherStyles={styles.formField}
                        />
                        <FormField
                            value={form.phoneNumber}
                            placeholder="Enter your phone number"
                            handleChangeText={(text) => setForm({ ...form, phoneNumber: text })}
                            otherStyles={styles.formField}
                            keyboardType="phone-pad"
                        />
                        <FormField
                            value={form.dateOfBirth}
                            placeholder="DD/MM/YYYY"
                            handleChangeText={(text) => setForm({ ...form, dateOfBirth: text })}
                            otherStyles={styles.formField}
                            keyboardType="numeric"
                        />
                        <FormField
                            value={form.email}
                            placeholder="Enter your email"
                            handleChangeText={(text) => setForm({ ...form, email: text })}
                            otherStyles={styles.formField}
                            keyboardType="email-address"
                        />
                        <FormField
                            value={form.password}
                            placeholder="Create a password"
                            handleChangeText={(text) => setForm({ ...form, password: text })}
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
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: -1,
        paddingBottom: 100,
    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '15%',
        marginBottom: 9,
    },
    title: {
        fontSize: 30,
        color: '#333',
        fontWeight: '600',
        marginTop: 0,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 20,
    },
    brownText: {
        color: '#8B4513',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 0,
    },
    formField: {
        borderRadius: 30,
        marginBottom: 20,
        fontFamily: 'Poppins-Bold',
        paddingVertical: 10,
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
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 6,
        color: '#8B4513',
    },
});

export default SignUp;
