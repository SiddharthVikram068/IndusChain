import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import SupplyChainContract from '../../contract/SupplyChain.json'; // Replace with your contract's ABI JSON file
import CustomButton from '../../components/CustomButton'; // Custom button component
import FormField from '../../components/FormField'; // Custom form field component

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
  const { provider } = useWalletConnectModal();

  const handleCreateProduct = async () => {
    try {
      const etherProvider = new ethers.providers.Web3Provider(provider);
      const signer = etherProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, SupplyChainContract.abi, signer);

      const tx = await contract.addProduct(
        ethers.utils.parseUnits(productId, 0), 
        productName,
        companyName,
        location
      );

      await tx.wait();
      Alert.alert('Success', 'Product created successfully!');
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while creating the product. Please try again.');
    }
  };

  const resetForm = () => {
    setProductId('');
    setProductName('');
    setCompanyName('');
    setLocation('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Product</Text>
      <Text style={styles.subTitle}>Fill in the details below to add a product to the supply chain.</Text>
      
      <FormField
        placeholder="Product ID"
        value={productId}
        onChangeText={setProductId}
        keyboardType="numeric"
        style={styles.formField}
      />
      
      <FormField
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={styles.formField}
      />
      
      <FormField
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
        style={styles.formField}
      />
      
      <FormField
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.formField}
      />

      <CustomButton 
        title="Create Product" 
        onPress={handleCreateProduct} 
        style={styles.button} 
      />
      
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff', // Set background to white
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333', // Darker text color for contrast
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666', // Light gray text for subtitle
    marginBottom: 30, // Spacing before form fields
  },
  formField: {
    marginBottom: 20, // Increased margin between form fields
  },
  button: {
    paddingTop:40,
    marginTop: 50, // Increased margin between "Location" and "Create Product" button
    backgroundColor: '#007bff', // Bright primary color for button
    paddingVertical: 14,
    borderRadius: 100,
    elevation: 3, // Adds shadow effect on Android
  },
});

export default CreateProductScreen;
