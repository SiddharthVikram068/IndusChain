import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import Lottie from 'lottie-react-native';
import DisplayButton from '../../components/DisplayButton'; // Import the DisplayButton component
import WalletButton from '../../components/WalletButton'; // Import the WalletButton component
import { router } from 'expo-router';

// Define your project ID and provider metadata
const projectId = "1e17a2872b93b5b42a336585c052e9ff"; // Your WalletConnect project ID
const providerMetadata = {
  name: 'CargoChain',
  description: 'A decentralized supply chain application',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const WalletConnectionPage = () => {
  const { address, open, isConnected } = useWalletConnectModal();
  const [showAddress, setShowAddress] = useState(false); // State to manage address visibility

  const handleConnection = () => {
    if (!isConnected) {
      open(); // Open the wallet connect modal
    } else {
      router.replace('/scan'); // Navigate to the scan page if already connected
    }
  };

  // Function to toggle the address visibility with animation
  const toggleAddressVisibility = () => {
    setShowAddress(!showAddress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Lottie 
          source={require('../../assets/videos/wallet.json')} // Path to your Lottie file
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.title}>Connect Your Wallet</Text>
        <Text style={styles.description}>
          Please connect your wallet to access all features of the CargoChain application.
        </Text>

        {/* Use WalletButton instead of TouchableOpacity */}
        <WalletButton onPress={handleConnection} title={isConnected ? 'Continue!' : 'Connect Wallet'} />

        {/* Display connected address using the DisplayButton component inside a curtain */}
        {isConnected && (
          <TouchableOpacity onPress={toggleAddressVisibility} style={styles.curtain}>
            <Text style={styles.curtainText}>Wallet Connected</Text>
            { <DisplayButton address={address} />}
          </TouchableOpacity>
        )}
      </View>

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Light background color
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#007bff', // Add border color for a wallet effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  animation: {
    width: '100%',
    height: 150, // Adjust height as needed
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#2C3E50',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#34495E',
    paddingHorizontal: 20,
  },
  curtain: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', // Light blue color for the curtain effect
  },
  curtainText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default WalletConnectionPage;
