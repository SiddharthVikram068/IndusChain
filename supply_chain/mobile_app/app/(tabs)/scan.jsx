import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Scan = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null); // To store scanned data
  

  // Handle scanned QR code data
  const handleBarCodeScanned = async ({ data }) => {
    setScanning(false);
    try {
      await AsyncStorage.setItem('ProductId', data.toString());
      setScannedData(data.toString()); // Update state with scanned data
     
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save data');
    }
     router.replace("/productDetails");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>
      {scanning ? (
        <CameraView
          onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>Press the button below to start scanning</Text>
          {/* Display scanned data inside <Text> */}
          {scannedData && (
            <Text style={styles.scannedData}>
              Scanned Product ID: {scannedData}
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanning(!scanning)}
      >
        <Text style={styles.buttonText}>
          {scanning ? 'Stop Scanning' : 'Start Scanning'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  instructionsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  scannedData: {
    marginTop: 20,
    fontSize: 18,
    color: '#2C3E50',
  },
});

export default Scan;
