import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import { ethers } from 'ethers';
import * as Location from 'expo-location';
import SupplyChainContract from '../../contract/SupplyChain.json';
import SubmitButton from '../../components/SubmitButton';
import FormField from '../../components/FormField';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [location, setLocation] = useState(''); // Store location as a string
  const [loading, setLoading] = useState(false);
  const { provider } = useWalletConnectModal();

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Update location state with formatted string
      setLocation(`${latitude.toFixed(6)},${longitude.toFixed(6)}`);
      console.log(`Current Location - Latitude: ${latitude}, Longitude: ${longitude}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch location. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
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
        {/* <View style={styles.locationContainer}> */}
          <FormField
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            style={styles.locationInput}
          />
       <TouchableOpacity onPress={getCurrentLocation} style={styles.iconButton}>
  
  <Text style={styles.buttonText}>Set Current Location</Text>
</TouchableOpacity>

        {/* </View> */}

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#70260F" />
          ) : (
            <SubmitButton
              title="Create Product"
              handlePress={handleCreateProduct}
              disabled={!productId || !productName || !companyName || !location}
              style={styles.submitButton}
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure space is between input and button
    marginBottom: 20,
  },
  locationInput: {
    flex: 1,
    height: 60, // Increased height for better visibility
    fontSize: 16, // Increased font size for better readability
    paddingHorizontal: 10, // Add some padding
    marginRight: 10, // Add some space between the input and button
  },
  iconButton: {
    padding: 12, // Increased padding for the button
    height: 60, // Set the button height to match the input
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
  },
  buttonContainer: {
    marginTop: 30,
  },
  submitButton: {
    height: 60, // Set height for the SubmitButton
  },
});

export default CreateProductScreen;
