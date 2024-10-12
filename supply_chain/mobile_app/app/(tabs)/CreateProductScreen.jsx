import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator, // Import ActivityIndicator for loading spinner
} from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import SupplyChainContract from '../../contract/SupplyChain.json';
import SubmitButton from '../../components/SubmitButton'; 
import FormField from '../../components/FormField';

const projectId = "1e17a2872b93b5b42a336585c052e9ff";
const contractAddress = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6";

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
  const [loading, setLoading] = useState(false); // State to track loading
  const { provider } = useWalletConnectModal();

  const handleCreateProduct = async () => {
    try {
      setLoading(true); // Start loading
      const etherprovider = new ethers.providers.Web3Provider(provider);
      const signer = etherprovider.getSigner();
      const contract = new ethers.Contract(contractAddress, SupplyChainContract.abi, signer);

      const tx = await contract.addProduct(
        ethers.utils.parseUnits(productId, 0),
        productName,
        companyName,
        location
      );

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
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('../../assets/images/bg.png')} style={styles.backgroundImage} />
      
      {/* Form Container */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create a New Product</Text>

        <FormField
          placeholder="Product ID"
          value={productId}
          onChangeText={setProductId}
          keyboardType="numeric"
        />
        <FormField
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <FormField
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <FormField
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        <View style={styles.buttonContainer}>
          {loading ? ( // Show loading spinner if loading
            <ActivityIndicator size="large" color="#70260F" />
          ) : (
            <SubmitButton
              title="Create Product"
              handlePress={handleCreateProduct}
              disabled={!productId || !productName || !companyName || !location}
            />
          )}
        </View>
      </View>

      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '120%', 
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Medium',
    color: '#70260F',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default CreateProductScreen;
