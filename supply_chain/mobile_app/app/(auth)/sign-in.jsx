import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'distributor',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true);
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 1000; // Initial delay in ms

    while (attempts < maxAttempts) {
      try {
        const result = await signIn(form.email, form.password);
        router.replace('/home');
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
          <Text style={styles.title}>
            Log in to <Text style={styles.brownText}>CargoChain</Text>
          </Text>
        </View>
        <View style={styles.formContainer}>
          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(text) => setForm({ ...form, name: text })}
            otherStyles={styles.formField}
          />
          <FormField
            title="Email"
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
            secureTextEntry
          />
          <FormField
            title="Phone Number"
            value={form.phoneNumber}
            handleChangeText={(text) => setForm({ ...form, phoneNumber: text })}
            otherStyles={styles.formField}
            keyboardType="phone-pad"
          />
          <View style={styles.radioButtonContainer}>
            <Text style={styles.radioTitle}>Select Role</Text>
            <View style={styles.radioOptionRow}>
              <View style={styles.radioOption}>
                <RadioButton
                  value="distributor"
                  status={form.role === 'distributor' ? 'checked' : 'unchecked'}
                  onPress={() => setForm({ ...form, role: 'distributor' })}
                />
                <Text style={styles.radioLabel}>Distributor</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton
                  value="verifier"
                  status={form.role === 'verifier' ? 'checked' : 'unchecked'}
                  onPress={() => setForm({ ...form, role: 'verifier' })}
                />
                <Text style={styles.radioLabel}>Verifier</Text>
              </View>
            </View>
          </View>
          <CustomButton
            title="Log in"
            handlePress={submit}
            containerStyles={styles.buttonContainer}
            isLoading={isSubmitting}
            textStyles={{ color: '#FFFFFF' }}
            style={styles.button}
          />
          <View style={styles.signUpLink}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Link href="/sign-up" style={styles.signUpLinkText}>
              <Text style={styles.signUpLinkText}>Sign up</Text>
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
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },
  innerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    color: '#2C3E50',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    lineHeight: 40,
  },
  brownText: {
    color: '#D35400',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  formField: {
    marginBottom: 20,
  },
  radioButtonContainer: {
    marginVertical: 20,
  },
  radioTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: '#34495E',
    marginBottom: 10,
  },
  radioOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
  buttonContainer: {
    backgroundColor: '#000000',
    width: 200, // Adjust width for a smaller button
    height: 60, // Reduce height for a smaller button
    borderRadius: 40, // Rounded corners for better aesthetics
    justifyContent: 'center',
    alignSelf: 'center', // Center the button horizontally
  },
  button: {
    backgroundColor: '#3498DB', // Lighter blue for contrast
    borderRadius: 8, // Keep the button corners rounded
    paddingVertical: 10, // Reduce vertical padding for a smaller look
    paddingHorizontal: 20, // Adjust horizontal padding
    alignItems: 'center',
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontFamily: 'Poppins-Medium',
  },
  signUpLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#2980B9',
    marginLeft: 5,
  },
});

export default SignIn;
