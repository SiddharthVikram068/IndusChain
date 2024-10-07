import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const qr = () => {
  const [facing, setFacing] = useState('back');
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    
    // Save the scanned data to local storage
    try {
      const newEntry = { type, data };
      const existingData = await AsyncStorage.getItem('scannedData');
      const scannedData = existingData ? JSON.parse(existingData) : [];

      // Add new entry to the existing data
      scannedData.push(newEntry);
      await AsyncStorage.setItem('scannedData', JSON.stringify(scannedData));

      Alert.alert(`Scanned Data`, `Type: ${type}\nData: ${data}`, [
        { text: 'OK', onPress: () => setScanned(false) },
      ]);
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#ffffff']}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <View style={styles.container}>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "70%",
    margin: "15%",
    borderRadius: 120,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default qr;
