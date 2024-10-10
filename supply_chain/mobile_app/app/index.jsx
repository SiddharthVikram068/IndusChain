import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import CustomButton from '@/components/CustomButton';
import {Link } from 'expo-router';
export default function Component() {
  const animation = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          {/* Lottie Animation with Smaller Size */}
          <LottieView
            ref={animation}
            source={require('../assets/videos/intro2.json')}
            autoPlay
            loop
            speed={0.9}
            style={styles.lottieAnimation}
          />

          {/* Title and Subtitle */}
          <Text style={styles.title}>CargoChain</Text>
          <Text style={styles.subtitle}>
            Your supply chain <Text style={styles.highlight}>manufacturer</Text>
          </Text>

          {/* Buttons with Adjusted Spacing and Sizes */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Sign In"
              handlePress={() => router.push('/sign-in')}
              containerStyles={styles.button} // Use button style directly
              borderColor="#000000"  // Black border
              textColor="#000000"  // Black text for Sign In
            />
            <CustomButton
              title="Register"
              handlePress={() => router.push('/(auth)/sign-up')}
              containerStyles={styles.button} // Use button style directly
              borderColor="#70260F"  // Maroon border
              textColor="#000000"  // Black text for Register
            />
          </View>
          <Link href="/(tabs)/home">hello</Link>

          {/* New Buttons for Wallet Navigation */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Send"
              handlePress={() => router.push('/web3/wallet_connect')}
              containerStyles={styles.button} // Use button style directly
              borderColor="#4CAF50"  // Green border
              textColor="#000000"  // White text for Send
            />
            <CustomButton
              title="Receive"
              handlePress={() => router.push('/wallet/receive')}
              containerStyles={styles.button} // Use button style directly
              borderColor="#2196F3"  // Blue border
              textColor="#000000"  // White text for Receive
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  lottieAnimation: {
    width: 450,  // Reduced size of the animation
    height: 250, 
    marginBottom: 10,  // Reduced spacing below the animation
  },
  title: {
    justifyContent:'left',
    fontSize: 50, // Increased font size for prominence
    textAlign: 'left', // Aligns the text to the left
    fontFamily: 'Poppins-Bold', // Ensures bold, elegant font
    color: '#8E1E1C', // Dark red color for emphasis
    marginBottom: -5, // Adds space between title and next element
    textTransform: 'capitalize', // Capitalizes the first letter of each word
},

  subtitle: {
    fontSize: 16,  // Adjusted subtitle font size
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    marginTop:0,
    textAlign: 'center',
    marginBottom: 40,  // Increased spacing below subtitle
    textTransform: 'capitalize',  // Sentence case for subtitle
  },
  highlight: {
    color: '#70260F',
    fontFamily: 'Poppins-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',  // Align buttons side by side
    width: '100%',
    justifyContent: 'space-between', // Space buttons evenly
    paddingHorizontal: 10,  // Space around the buttons
  },
  button: {
    marginBottom: 25,  // Adds space below buttons
    borderWidth: 4,  // Thick border
    borderRadius: 10,  // Rounded corners
    alignItems: 'center',  // Center text horizontally
    justifyContent: 'center',  // Center text vertically
    paddingVertical: 10,  // Vertical padding for button height
    paddingHorizontal: 20,  // Horizontal padding for button width
    flex: 1,  // Allow buttons to grow equally
    marginHorizontal: 5,  // Space between buttons
  },
});
