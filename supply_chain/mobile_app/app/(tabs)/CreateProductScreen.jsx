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
      <Text style={styles.title}>Create a New Product</Text>
      
      {/* Center container */}
      <View style={styles.centerContainer}>
        <View style={styles.formContainer}>
          {/* Input label and field for Product ID */}
          <View style={styles.inputs}>
                       <FormField
              placeholder="Enter Product ID"
              value={productId}
              onChangeText={setProductId}
              keyboardType="numeric"
            />
          </View>
  
          {/* Input label and field for Product Name */}
          <View style={styles.inputs}>
            
            <FormField
              placeholder="Enter Product Name"
              value={productName}
              onChangeText={setProductName}
            />
          </View>
  
          {/* Input label and field for Company Name */}
          <View style={styles.inputs}>
            
            <FormField
              placeholder="Enter Company Name"
              value={companyName}
              onChangeText={setCompanyName}
            />
          </View>
  
          {/* Input label and field for Location */}
          <View style={styles.inputs}>
                     <FormField
              placeholder="Enter Location"
              value={location}
              onChangeText={setLocation}
              style={styles.locationInput}
            />
          </View>
  
          <TouchableOpacity onPress={getCurrentLocation} style={styles.iconButton}>
            <Text style={styles.buttonText}>Set Current Location</Text>
          </TouchableOpacity>
  
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
      </View>
  
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />
    </View>
  );
};
  
  const styles = StyleSheet.create({
    inputs: {
      flexDirection: 'column',
      marginBottom: 10,  // Adjust spacing between input fields (optional)
      paddingTop: 0,     // Ensures no extra space on top of input fields
    },
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: 37,
      fontFamily: 'Poppins-Bold',
      color: '#111111',
      textAlign: 'center',
      marginTop: 80,
    },
    /* New container for centering the form */
    centerContainer: {
      flex: 1,
      justifyContent: 'center', // Aligns the form container vertically centered
      alignItems: 'center',     // Aligns the form container horizontally centered
    },
    formContainer: {
      flexDirection: 'column',
      width: '90%',  // Optional: set a fixed width to avoid the form stretching
      padding: 30,
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderRadius: 30,
      elevation: 10,
      shadowColor: '#000',
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 2,  // Reduced margin to remove gap
      textAlign: 'left',  // Aligns the text to the left
    },
    locationInput: {
      flex: 1,
      height: 60,
      fontSize: 16,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    iconButton: {
      padding: 12,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      marginTop: 30,
    },
    submitButton: {
      height: 60,
    },
  });
  
export default CreateProductScreen;
