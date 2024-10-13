import React, { useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {Link} from 'expo-router'
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import CustomButton from '@/components/CustomButton';

export default function Component() {
  const animation = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" style="dark" />
      <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.title}>Cargo<Text style={styles.highlight1}>Chain</Text></Text>
        <View style={styles.content}>
          {/* Lottie Animation */}
          <LottieView
            ref={animation}
            source={require('../assets/videos/intro2.json')}
            autoPlay
            loop
            speed={0.9}
            style={styles.lottieAnimation}
          />

          {/* Title and Subtitle */}
         
          <Text style={styles.subtitle}>
            Your supply chain <Text style={styles.highlight}>manufacturer</Text>
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Sign In"
              handlePress={() => router.push('/sign-in')}
              containerStyles={styles.signInButton}
              textColor="#FFFFFF"
            />
            <CustomButton
              title="Register"
              handlePress={() => router.push('/(auth)/sign-up')}
              containerStyles={styles.registerButton}
              textColor="#FFFFFF"

            />
          </View>













           {/* <Link href="/(tabs)/home">hello</Link> */}
          {/*<Link href="/web3/wallet_connect">wallet</Link> */}
{/* =======
>>>>>>> c57b618190d11c388d4b92c52148f20359c8f884 */}

          {/* Additional Buttons */}
          {/* <View style={styles.buttonContainer}>
            <CustomButton
              title="Send"
              handlePress={() => router.push('/web3/wallet_connect')}
              containerStyles={styles.sendButton}
              textColor="#FFFFFF"
            />
            <CustomButton
              title="Receive"
              handlePress={() => router.push('/wallet/receive')}
              containerStyles={styles.receiveButton}
              textColor="#FFFFFF"
            />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    // marginBottom: 10,
  },
  title: {
    position: 'relative', // Position it at the top-left corner
    top: -80,
    left: 0,
    fontSize: 50,
    fontFamily: 'Poppins-Bold',
    color: '#8E1E1C',
    margin: 10, // Small margin for better spacing from the edge
    textTransform: 'capitalize',
  },
  highlight1: {
    fontSize: 56,
    fontFamily: 'Poppins-Bold',
    color: '#111111',
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 40,
  },
  highlight: {
    color: '#70260F',
    fontFamily: 'Poppins-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  registerButton: {
    backgroundColor: '#70260F',
    paddingVertical: 15,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  receiveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
});
