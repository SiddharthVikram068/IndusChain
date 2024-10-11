import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, ScrollView, RefreshControl, Modal, TextInput } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');

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

  const addNewStep = async () => {
    const contract = getContract();
    if (!contract || !productId || !status || !location) return;

    try {
      await contract.updateStatus(productId, status, location);
      setMessage('New step added successfully');
      await getProductHistory(); // Refresh product history after adding new step
      setModalVisible(false); // Close the modal after successful addition
    } catch (error) {
      console.error(error);
      setMessage('Failed to add new step');
    }
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

    {/* Add New Step Button */}
    <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
      <Text style={styles.buttonText}>Add New Step</Text>
    </TouchableOpacity>

    {/* Notification-like Modal */}
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalNotification}>
          <Text style={styles.modalTitle}>Add New Step</Text>

          <TextInput
            style={styles.input}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
          />

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />

<TouchableOpacity style={styles.addStepButton} onPress={addNewStep}>
  <Text style={styles.buttonText}>Add Step</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
  <Text style={styles.buttonText}>Close</Text>
</TouchableOpacity>

        </View>
      </View>
    </Modal>

    <Text style={styles.messageText}>{message}</Text>
  </ScrollView>
)
};

// Updated Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
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
  addButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dim background to emphasize the pop-up
  },
  modalNotification: {
    width: 250, // Small square-like shape
    padding: 30,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addStepButton: {
    backgroundColor: '#007AFF', // Blue color for the "Add Step" button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#FF3B30', // Red color for the "Close" button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 20,
    fontSize: 14,
    color: '#FF0000',
  },
});

export default ProductDetails;