import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import { RadioButton } from 'react-native-paper';

const SignIn = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'distributor',
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = () =>
  {

  }
  const animation = useRef(null);

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
            containerStyles="w-full mt-7"
            isLoading={isSubmitting}
            textStyles={{ color: '#000000' }} // White text for button
            style={styles.button} // Additional button styling
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
    backgroundColor: '#ffffff', // Light background color for a softer look
    paddingHorizontal: 20, // Adjust padding for a better layout
    paddingBottom: 30,
    marginBottom:20,
    marginTop:35,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 20, // Add some top padding for the content
  },
  innerContainer: {
    alignItems: 'center',
    marginBottom: 20, // Ensure there's space below the title
  },
  title: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginVertical: 10, // Add vertical margin for spacing
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
    marginTop: 15, // Increased margin for better separation
  },
  radioButtonContainer: {
    marginVertical: 10, // Adjusted for better spacing
  },
  radioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    color: '#000',
    marginBottom: 10, // Added space below the title
  },
  radioOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Space out options
    marginHorizontal: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  button: {
    backgroundColor: '#8B4513', // Set a brown color for the button
    borderRadius: 25, // Rounded corners for the button
    paddingVertical: 12, // Added padding for button height
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  signUpText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-Medium',
  },
  signUpLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 5,
    color: '#700F0F',
  },
});

export default SignIn;
