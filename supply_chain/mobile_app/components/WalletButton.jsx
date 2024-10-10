import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const WalletButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default WalletButton;
