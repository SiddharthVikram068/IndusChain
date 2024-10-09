import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import SupplyChainContract from '../../contract/SupplyChain.json'; // Replace with your contract's ABI JSON file

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

const CreateProductScreen = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const { address, open, isConnected, provider } = useWalletConnectModal();

  const handleCreateProduct = async () => {
    try {
      // Connect to the wallet
      const etherprovider = new ethers.providers.Web3Provider(provider);
      const signer = etherprovider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, SupplyChainContract.abi, signer);

      // Call the addProduct function on the smart contract
      const tx = await contract.addProduct(
        ethers.utils.parseUnits(productId, 0), // Assuming productId is an integer
        productName,
        companyName,
        location
      );

      // Wait for the transaction to be mined
      await tx.wait();
      Alert.alert('Success', 'Product created successfully!');
      
      // Reset form fields
      setProductId('');
      setProductName('');
      setCompanyName('');
      setLocation('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the product. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product ID"
        value={productId}
        onChangeText={setProductId}
        keyboardType="numeric" // Assuming product ID is numeric
      />
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Create Product" onPress={handleCreateProduct} />
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CreateProductScreen;
