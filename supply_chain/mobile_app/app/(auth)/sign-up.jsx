import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native'; // Import Lottie for animations
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { RadioButton } from 'react-native-paper';

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        dateOfBirth: '',
        password: '', // Added password state
        userType: 'USER',
    });

    const animation = useRef(null);

    const handleUserTypeChange = (value) => {
        setForm({ ...form, userType: value });
    };

    const submit = () => {
        // Handle form submission here
        console.log(form); // Replace this with your submit logic
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.innerContainer}>
                    {/* Lottie Animation */}
                    {/* <LottieView
                        ref={animation}
                        source={require('../../assets/videos/loginsignin.json')} // Adjust the path to your animation file
                        autoPlay
                        loop
                        style={styles.lottieAnimation}
                    /> */}
                    <Text style={styles.title}>Join The <Text style={styles.brownText}>CargoChain</Text></Text>
                </View>
                <View style={styles.formContainer}>
                    <FormField
                        title="Name"
                        value={form.name}
                        handleChangeText={(text) => setForm({ ...form, name: text })}
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
                        title="Password" // New Password Field
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
        backgroundColor: '#FFFFFF', // White background
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
        width: 100, // Adjusted animation size
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
        color: '#8B4513', // Brown color for "CargoChain"
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
        color: '#8B4513', // Brown color for the sign-in text
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
