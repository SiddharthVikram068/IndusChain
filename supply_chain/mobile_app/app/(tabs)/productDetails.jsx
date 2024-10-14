import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Modal,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import SupplyChainContract from '../../contract/SupplyChain.json';

const projectId = "1e17a2872b93b5b42a336585c052e9ff";
const contractAddress = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6";

const CustomButton = ({ onPress, title, style }) => (
  <TouchableOpacity style={[styles.customButton, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

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
      const details = await contract.getProductDetails(ethers.BigNumber.from(productId));
      setProductDetails(details);
      setMessage(`Details retrieved for product ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to retrieve product details');
    }
  };

  const getProductHistory = async () => {
    const contract = getContract();
    if (!contract || !productId) {
      setMessage('Contract or Product ID not found');
      return;
    }

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
    await fetchProductIdFromLocalStorage();
    await getProductDetails();
    await getProductHistory();
    setRefreshing(false);
  };

  const addNewStep = async () => {
    const contract = getContract();
    if (!contract || !productId || !status || !location) return;

    try {
      await contract.updateStatus(productId, status, location);
      setMessage('New step added successfully');
      await getProductHistory();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      setMessage('Failed to add new step');
    }
  };

  const convertTimestampToReadable = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toLocaleString(); // Format to a readable string
  };

  useEffect(() => {
    const initialize = async () => {
      await fetchProductIdFromLocalStorage();
      if (productId) {
        await getProductDetails();
        await getProductHistory();
      }
    };

    initialize();
  }, [isConnected, productId]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
        <View style={styles.header}>
        <Text style={styles.title}>Product</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {productDetails ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Product Details:</Text>
          <Text style={styles.detailText}>ID: {productDetails[0].toString()}</Text>
          <Text style={styles.detailText}>Name: {productDetails[1]}</Text>
          <Text style={styles.detailText}>Company: {productDetails[2]}</Text>
          <Text style={styles.detailText}>Manufacturer: {productDetails[3]}</Text>
          <Text style={styles.detailText}>Current Owner: {productDetails[4]}</Text>
          <Text style={styles.detailText}>Creation Timestamp: {convertTimestampToReadable(productDetails[5].toString())}</Text>
        </View>
      ) : (
        <Text style={styles.infoText}>No product details available.</Text>
      )}

      {productHistory.length > 0 ? (
        <View>
          <Text style={styles.historyTitle}>Product History:</Text>
          {productHistory.map((step, index) => (
            
            <View key={index}>
              <View style={styles.historyContainer} >
              
              <View style={styles.historyStep}>
                <Text style={styles.historyText}>Status: </Text>
                <View style={styles.red}>
                <Text  style={styles.historyText}
                 >{step.status}</Text>
                </View>
                <Text style={styles.historyText}>Location: {step.location}</Text>
                <Text style={styles.historyText}>Stakeholder: {step.stakeholder}</Text>
                <Text style={styles.historyText}>Timestamp: {convertTimestampToReadable(step.timestamp.toString())}</Text>

              </View>
             
            </View>

            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.infoText}>No product history available</Text>
      )}

      {/* Add New Step Button */}
     

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

            <CustomButton style={styles.addStepButton} onPress={addNewStep} title="Add Step" />

            <CustomButton style={styles.closeButton} onPress={() => setModalVisible(false)} title="Close" />
          </View>
        </View>
      </Modal>

      <Text style={styles.messageText}>{message}</Text>
    </ScrollView>
  );
};

// Updated Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0', // Black background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111111', // White text
    marginTop:20,
  },
  addButton: {
    backgroundColor: '#007AFF', // Button color
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  detailsContainer: {
    backgroundColor:'#2a3439', // Dark grey for contrast
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  red: {
    marginVertical: 10,
    backgroundColor: '#4caf50',
    padding: 10,
    width: 120,
    borderRadius: 10,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text
  },
  detailText: {
    fontSize: 18,
    color: '#fff', // White text
  },
  historyTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#111111', // White text
    marginBottom: 10,
  },
  historyContainer: {
    backgroundColor: '#2a3439',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyStep: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  historyText: {
    fontSize: 16,
    color: '#fff', // White text
  },
  infoText: {
    fontSize: 18,
    color: '#999999',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalNotification: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ff0000', // Red for messages
  },
  addStepButton: {
    backgroundColor: '#2a3439',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  closeButton: {
    backgroundColor: '#111111',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ProductDetails;
