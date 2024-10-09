import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'; // Add a suitable image if needed
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';

const SignIn = () => {
  const [form, setForm] = useState({
    phoneNumber: '',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Image
            // Uncomment and use a logo image if needed
            // source={images.map} 
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>Log in to RideChain</Text>
        </View>
        <View style={styles.formContainer}>
          <FormField
            title="Phone Number"
            value={form.phoneNumber}
            handleChangeText={(text) => setForm({ ...form, phoneNumber: text })}
            otherStyles={styles.formField}
            keyboardType="phone-pad"
          />
          <CustomButton
            title="Log in"
            handlePress={() => {}}
            containerStyles="w-full mt-7"
          />
          <View style={styles.signUpLink}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Link
              href="/sign-up"
              style={styles.signUpLinkText}
            >
              Sign up
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
    padding: 20, // Padding to give space around edges
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center', // Center content vertically
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30%', // Increased height for better visual spacing
  },
  logo: {
    width: 70, // Adjusted size
    height: 70, // Adjusted size
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 28, // Increased font size
    color: '#000', // Black text color
    fontWeight: 'bold', // Bolder title
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  formField: {
    marginTop: 20, // Increased top margin
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20, 
  },
  signUpText: {
    fontSize: 16,
    color: '#333', // Dark gray color
    fontFamily: 'Poppins-Medium',
  },
  signUpLinkText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 5,
    color: '#700F0F', // Link color to match theme
  },
});

export default SignIn;
