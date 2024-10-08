import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput } from 'react-native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import { ethers } from 'ethers'; // Correct import

import SupplyChainContract from '../contracts/SupplyChain.json'; // Replace with your contract's ABI JSON file

const projectId = "1e17a2872b93b5b42a336585c052e9ff";
const contractAddress = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6"; // Replace with your contract address

const providerMetadata = {
  name: 'YOUR_PROJECT_NAME',
  description: 'YOUR_PROJECT_DESCRIPTION',
  url: 'https://your-project-website.com/',
  icons: ['https://your-project-logo.com/'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

function App() {
  const { address, open, isConnected, provider } = useWalletConnectModal();
  const [productId, setProductId] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [productDetails, setProductDetails] = useState(null);
  const [productHistory, setProductHistory] = useState([]);

  const getContract = () => {
    if (!provider) {
      console.error("Provider is not defined");
      return null; // Ensure provider is defined
    }
  console.log(provider);
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
      provider?.disconnect(); // Disconnect if already connected
    } else {
      open(); // Open modal to connect
    }
  };

  const addProduct = async () => {
    const contract = getContract();
    if (!contract) return;

    try {
      const tx = await contract.addProduct(productId, 'Product Name', 'Company Name', location);
      await tx.wait();
      setMessage(`Product added with ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to add product');
    }
  };

  const updateStatus = async () => {
    const contract = getContract();
    if (!contract) return;

    try {
      const tx = await contract.updateStatus(productId, status, location);
      await tx.wait();
      setMessage(`Status updated for product ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to update status');
    }
  };

  const getProductDetails = async () => {
    const contract = getContract();
    if (!contract) return;

    try {
      const details = await contract.getProductDetails(productId);
      console.log(details);
      // setProductDetails(details);
      setMessage(`Details retrieved for product ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to retrieve product details');
    }
  };

  const getProductHistory = async () => {
    const contract = getContract();
    if (!contract) return;

    try {
      const history = await contract.getProductHistory(productId);
      setProductHistory(history);
      setMessage(`History retrieved for product ID: ${productId}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to retrieve product history');
    }
  };

  const transferOwnership = async (newOwnerAddress) => {
    const contract = getContract();
    if (!contract) return;

    try {
      const tx = await contract.transferOwnership(productId, newOwnerAddress);
      await tx.wait();
      setMessage(`Ownership transferred for product ID: ${productId} to ${newOwnerAddress}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to transfer ownership');
    }
  };

  useEffect(() => {
    if (isConnected) {
   
    }
  }, [isConnected]);

  return (
    <View style={styles.container}>
      <Button
        onPress={handleConnection}
        title={isConnected ? 'Disconnect' : 'Connect'}
      />

      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />

      {isConnected ? (
        <Text>Connected Address: {address}</Text>
      ) : (
        <Text>Please connect your wallet.</Text>
      )}

      <Text>Product ID:</Text>
      <TextInput
        value={productId}
        onChangeText={setProductId}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text>Status:</Text>
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />
      <Text>Location:</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <Button title="Add Product" onPress={addProduct} />
      <Button title="Update Status" onPress={updateStatus} />
      <Button title="Get Product Details" onPress={getProductDetails} />
      <Button title="Get Product History" onPress={getProductHistory} />
      <Button title="Transfer Ownership" onPress={() => transferOwnership('NEW_OWNER_ADDRESS')} /> 

      {productDetails ? (
  <View>
    <Text>Product Details:</Text>
    <Text>ID: {productDetails[0].toString()}</Text> {/* Convert BigNumber to string */}
    <Text>Name: {productDetails[1]}</Text>
    <Text>Company: {productDetails[2]}</Text>
    <Text>Manufacturer: {productDetails[3]}</Text>
    <Text>Current Owner: {productDetails[4]}</Text>
    <Text>Creation Timestamp: {productDetails[5].toString()}</Text>
  </View>
) : (
  <Text>No product details available.</Text>
)}

 
{productHistory.length > 0 ? (
  <View>
    <Text>Product History:</Text>
    {productHistory.map((step, index) => (
      <View key={index}>
        <Text>Status: {step.status}</Text>
        <Text>Location: {step.location}</Text>
        <Text>Stakeholder: {step.stakeholder}</Text>
        <Text>Timestamp: {step.timestamp.toString()}</Text> 
      </View>
    ))}
  </View>
) : (
  <Text>No product history available</Text>
)}


      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginVertical: 8,
    padding: 10,
    width: '100%',
  },
});

export default App;
