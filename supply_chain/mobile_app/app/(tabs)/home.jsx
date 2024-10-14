import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as ethers from 'ethers';
import { WalletConnectModal, useWalletConnectModal } from '@walletconnect/modal-react-native';
import SupplyChainContract from '../../contract/SupplyChain.json';

const contractAddress = "0xB0486Ec5947DEef6Fe9C736bAAAE7cd51CEf44e6";
const projectId = "1e17a2872b93b5b42a336585c052e9ff";
const MAP_BOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYXJ5YW1hbjMyMSIsImEiOiJjbHk1cjA4ZHUwMmtsMnZyMWpkd3BmdW56In0.A_pE1P5o-XKKaTX1PBKJXQ'; // replace with your actual token

const Home = () => {
  const { address, open, isConnected, provider } = useWalletConnectModal();
  const [location, setLocation] = useState(null);
  const [productId, setProductId] = useState('');
  const [productHistory, setProductHistory] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  // Initialize WalletConnect provider
  useEffect(() => {
    const initProvider = async () => {
      const wcProvider = new WalletConnectProvider({
        infuraId: 'YourInfuraProjectID' // Replace with your Infura project ID
      });
      setProvider(new ethers.providers.Web3Provider(wcProvider));
    };
    initProvider();
  }, []);

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

  useEffect(() => {
    const fetchRoute = async () => {
      if (productHistory.length < 2) {
        console.log('Not enough points to fetch route');
        return; // Not enough points to fetch a route
      }

      const start = productHistory[0].location.split(','); // First marker
      const end = productHistory[productHistory.length - 1].location.split(','); // Last marker

      try {
        let response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start[1]},${start[0]};${end[1]},${end[0]}?` +
          new URLSearchParams({
            geometries: 'geojson',
            access_token: MAP_BOX_ACCESS_TOKEN,
          })
        );
        let data = await response.json();
        let coordinates = data.routes[0].geometry.coordinates.map(coord => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        setRouteCoordinates(coordinates);
      } catch (error) {
        console.log('Error fetching route:', error);
      }
    };

    fetchRoute();
  }, [productHistory]);

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
      console.log("Started fetching history");
      const history = await contract.getProductHistory(productId);
      console.log(history);
      setProductHistory(history);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product history.');
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.header}>Supply Chain Tracker</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Product ID"
          value={productId}
          onChangeText={setProductId}
        />

        <TouchableOpacity style={styles.button} onPress={fetchProductHistory}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {location && (
          <MapView
            style={styles.map}
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
                  latitude: parseFloat(step.location.split(',')[0]), // assuming location is "lat,lng"
                  longitude: parseFloat(step.location.split(',')[1]),
                }}
                title={step.status}
                description={`Updated by: ${step.stakeholder}`}
              />
            ))}

            {/* Adding Polyline to connect the markers */}
            {routeCoordinates.length > 0 && (
              <Polyline coordinates={routeCoordinates} strokeColor="blue" strokeWidth={3} />
            )}
          </MapView>
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
  },
  input: {
    width: Dimensions.get('window').width - 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height / 2,
    borderRadius: 8,
  },
});

export default Home;
