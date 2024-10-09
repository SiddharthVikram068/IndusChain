import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

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

  const handleConnection = () => {
    if (!isConnected) {
      open(); // Open the wallet connect modal
      router.replace('/scan');
    }
    router.replace('/scan');
  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={{ uri: 'https://your-project-logo.com/' }} // Replace with your logo URL
        style={styles.logo}
      /> */}
      <Text style={styles.title}>Connect Your Wallet</Text>
      <Text style={styles.description}>
        Please connect your wallet to access all features of the CargoChain application.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleConnection}
      >
        <Text style={styles.buttonText}>
          {isConnected ? `Connected: ${address}` : 'Connect Wallet'}
        </Text>
      </TouchableOpacity>
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
    backgroundColor: '#ffffff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
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
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default WalletConnectionPage;
