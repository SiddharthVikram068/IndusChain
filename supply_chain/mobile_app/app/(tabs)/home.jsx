import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; // For search icon
import { FontAwesome5 } from '@expo/vector-icons'; // For map toggle and compass icons
import * as ethers from 'ethers';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import SupplyChainContract from '../../contract/SupplyChain.json';
import * as Font from 'expo-font'; // Import expo-font
import AppLoading from 'expo-app-loading'; // For loading fonts
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'; // Import Poppins font

const contractAddress = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6";
const projectId = "1e17a2872b93b5b42a336585c052e9ff";

const Home = () => {
  const { address, open, isConnected, provider } = useWalletConnectModal();
  const [location, setLocation] = useState(null);
  const [productId, setProductId] = useState('');
  const [productHistory, setProductHistory] = useState([]);
  const [mapType, setMapType] = useState('standard'); // To toggle map view type
  const [mapRef, setMapRef] = useState(null); // Reference to the MapView component for recentering

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Device.isDevice) {
        Alert.alert('Error', 'This will not work on an Android Emulator. Try it on your device.');
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access location was denied.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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

  const fetchProductHistory = async () => {
    if (!productId || !provider) {
      Alert.alert('Error', 'Please enter a valid Product ID and connect to the wallet.');
      return;
    }
    const contract = getContract();

    try {
      const history = await contract.getProductHistory(productId);
      setProductHistory(history);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product history.');
      console.error(error);
    }
  };

  // Toggle the map type between satellite and standard
  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'standard' ? 'satellite' : 'standard'));
  };

  // Function to recenter map to the user's current location
  const recenterMap = () => {
    if (location && mapRef) {
      mapRef.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.header}>Supply Chain Tracker</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Product ID"
            value={productId}
            onChangeText={setProductId}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchProductHistory}>
            <MaterialIcons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {location && (
          <View style={styles.mapContainer}> 
            <MapView
              ref={(ref) => setMapRef(ref)} // Capture map reference
              style={styles.map}
              mapType={mapType} // Apply map type
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {productHistory.map((step, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(step.location.split(',')[0]),
                    longitude: parseFloat(step.location.split(',')[1]),
                  }}
                  title={step.status}
                  description={`Updated by: ${step.stakeholder}`}
                />
              ))}
            </MapView>

            {/* Floating button to toggle map type */}
            <TouchableOpacity style={styles.mapToggle} onPress={toggleMapType}>
              <FontAwesome5 name="map-marked-alt" size={24} color="white" />
            </TouchableOpacity>

            {/* Floating button to recenter map */}
            <TouchableOpacity style={styles.compass} onPress={recenterMap}>
              <FontAwesome5 name="compass" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Poppins-Black', // Set Poppins font for the header
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#ccc',
    marginLeft: 10,
    borderRadius: 8,
  },
  mapContainer: {
    borderRadius: 20, // Set rounded corners for the map container
    overflow: 'hidden', // Ensure content inside respects the rounded corners
    width: Dimensions.get('window').width - 20, // Increased map width
    height: Dimensions.get('window').height * 0.6, // Increased map height
    marginBottom: 20,
  },
  map: {
    width: '100%', // Take full width of the container
    height: '100%', // Take full height of the container
  },
  mapToggle: {
    position: 'absolute',
    top: 70,
    right: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  compass: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Home;
