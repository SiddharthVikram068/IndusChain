import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Form = () => {
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [stakeholder, setStakeholder] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const handleSubmit = () => {
    alert(`Step Entered: ${status}, Location: ${location}, Stakeholder: ${stakeholder}, Timestamp: ${timestamp}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Next Step</Text>
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        placeholderTextColor="#A9A9A9" // Light gray color for placeholder text
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Stakeholder"
        value={stakeholder}
        onChangeText={setStakeholder}
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Timestamp"
        value={timestamp}
        onChangeText={setTimestamp}
        placeholderTextColor="#A9A9A9"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background for the form
    padding: 20,
    justifyContent: 'center',
    borderRadius: 10,
    shadowColor: '#000', // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark text for the title
    textAlign: 'center', // Center the title
  },
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Light border color
    borderRadius: 10, // Rounded corners
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF', // White background for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF', // Primary color for the button
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Form;
