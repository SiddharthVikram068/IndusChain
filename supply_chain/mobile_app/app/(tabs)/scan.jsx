import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { CameraView } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Scan = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null); // To store scanned data
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load custom fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'), // New font for the title
      'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'), // New font for the content
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanning(false);
    try {
      await AsyncStorage.setItem('ProductId', data.toString());
      setScannedData(data.toString());
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to save data');
    }
    router.replace("/productDetails");
  };

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>
      {scanning ? (
        <View style={styles.cameraWrapper}>
          <CameraView
            style={styles.cameraStyle}
            onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
          />
          <View style={styles.overlay}>
            {/* Add colorful corner markers as rounded L-shapes */}
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>
      ) : (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructions}>Press the button below to start scanning</Text>
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
  cameraWrapper: {
    marginTop: 20,
    borderRadius: 10,
    position: 'relative', // To position overlay and corner lines on top of the camera view
  },
  cameraStyle: {
    height: 250,
    width: 250,
    borderRadius: 20, // Set a higher border radius for rounded corners
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 2,
    left: 0,
    marginTop: -15,
    width: 46,
    height: 49,
    marginLeft: -14,
    borderTopLeftRadius: 10, // Rounded corner
    borderColor: '#800000',
    borderWidth: 8,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'transparent',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 47,
    height: 49,
    marginTop: -13,
    marginRight: -13,
    borderTopRightRadius: 10, // Rounded corner
    borderColor: '#800000',
    borderWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: 'transparent',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 47,
    height: 49,
    marginLeft: -13,
    marginBottom: -13,
    borderBottomLeftRadius: 10, // Rounded corner
    borderColor: '#800000',
    borderWidth: 8,
    borderTopWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'transparent',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 47,
    height: 49,
    marginRight: -13,
    marginBottom: -13,
    borderBottomRightRadius: 10, // Rounded corner
    borderColor: '#800000',
    borderWidth: 8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'Poppins-SemiBold', // Updated to use the new font
    fontSize: 28,
    fontWeight: '700',

    color: '#2C3E50',
    marginBottom: 30,
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructions: {
    fontFamily: 'Poppins-Light', // Updated to use the new font
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold', // Updated to use the new font
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  scannedData: {
    marginTop: 20,
    fontFamily: 'Poppins-Light', // Updated to use the new font
    fontSize: 18,
    color: '#2C3E50',
  },
});

export default Scan;
