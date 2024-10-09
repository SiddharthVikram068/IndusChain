import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import SupplyChainContract from '../../contract/SupplyChain.json';

const projectId = "1e17a2872b93b5b42a336585c052e9ff";
const contractAddress = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6";

const ProductDetails = () => {
  const { address, open, isConnected, provider } = useWalletConnectModal();
  const [productId, setProductId] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [productHistory, setProductHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const getContract = () => {
    if (!provider) {
      console.error("Provider is not defined");
      return null;
    }
    try {
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, SupplyChainContract.abi, signer);
      return contract;
    } catch (error) {
      console.error("Error creating contract:", error);
      return null;
    }
  };

  const handleConnection = () => {
    if (isConnected) {
      provider?.disconnect();
    } else {
      open();
    }
  };

  const fetchProductIdFromLocalStorage = async () => {
    const storedProductId = await AsyncStorage.getItem('ProductId');
    if (storedProductId) {
      setProductId(storedProductId);
    } else {
      setMessage('No product ID found in local storage.');
    }
  };

  const getProductDetails = async () => {
    const contract = getContract();
    if (!contract || !productId) return;

    try {
      const details = await contract.getProductDetails(productId);
      setProductDetails(details);
      setMessage(`Details retrieved for product ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to retrieve product details');
    }
  };

  const getProductHistory = async () => {
    const contract = getContract();
    if (!contract || !productId) return;

    try {
      const history = await contract.getProductHistory(productId);
      setProductHistory(history);
      setMessage(`History retrieved for product ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to retrieve product history');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProductIdFromLocalStorage(); // Fetch the product ID
    await getProductDetails(); // Get product details
    await getProductHistory(); // Get product history
    setRefreshing(false); // Stop refreshing
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchProductIdFromLocalStorage(); // Fetch the product ID
      if (productId) {
        await getProductDetails(); // Get product details if productId exists
        await getProductHistory(); // Get product history if productId exists
      }
    };
    
    initialize(); // Call the initialize function

    // Optional: add cleanup or additional effects here if necessary
  }, [isConnected, productId]); // Runs when isConnected or productId changes

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {productDetails ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Product Details:</Text>
          <Text style={styles.detailText}>ID: {productDetails[0].toString()}</Text>
          <Text style={styles.detailText}>Name: {productDetails[1]}</Text>
          <Text style={styles.detailText}>Company: {productDetails[2]}</Text>
          <Text style={styles.detailText}>Manufacturer: {productDetails[3]}</Text>
          <Text style={styles.detailText}>Current Owner: {productDetails[4]}</Text>
          <Text style={styles.detailText}>Creation Timestamp: {productDetails[5].toString()}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>No product details available.</Text>
      )}

      {productHistory.length > 0 ? (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Product History:</Text>
          {productHistory.map((step, index) => (
            <View key={index}>
              <View style={styles.historyStep}>
                <Text style={styles.historyText}>Status: {step.status}</Text>
                <Text style={styles.historyText}>Location: {step.location}</Text>
                <Text style={styles.historyText}>Stakeholder: {step.stakeholder}</Text>
                <Text style={styles.historyText}>Timestamp: {step.timestamp.toString()}</Text>
              </View>
              {index !== productHistory.length - 1 && (
                <View style={styles.separator} />
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.infoText}>No product history available</Text>
      )}

      <Text style={styles.messageText}>{message}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  connectButton: {
    backgroundColor: '#007AFF',
  },
  disconnectButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  connectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '100%',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  historyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    width: '100%',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  historyStep: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  historyText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
    marginVertical: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#FF3B30',
    marginTop: 20,
  },
});

export default ProductDetails;
