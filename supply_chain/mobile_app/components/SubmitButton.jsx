import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const SubmitButton = ({ 
  title, 
  handlePress, 
  containerStyles, 
  textStyles, 
  isLoading, 
  disabled 
}) => {
  return (
    <LinearGradient
      colors={['#f02f0F', '#70260F']} // Gradient colors for the button
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 12,  // Rounded corners
        paddingVertical: 14,
        paddingHorizontal: 20,
        ...containerStyles, // Spread any additional styles
      }}
    >
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading || disabled} // Disable the button if loading or explicitly disabled
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" /> // Loader while processing
        ) : (
          <Text 
            style={{
              color: '#fff', // White text color
              fontSize: 20,
              fontWeight: '600', // Semi-bold text
              ...textStyles // Spread any additional text styles
            }}
          >
            {title}  {/* Ensure title is wrapped in Text */}
          </Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SubmitButton;
