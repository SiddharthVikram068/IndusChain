import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({ 
  title, 
  handlePress, 
  containerStyles, 
  textStyles, 
  isLoading, 
  borderColor, 
  textColor 
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.65}
      style={{
        borderWidth: 1,  // Thick border
        borderRadius: 50,  // More rounded corners for pill-shaped button
        minHeight: 55,  // Button height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // No fill by default
        borderColor: borderColor || '#8E1C1C',  // Default border color
        ...containerStyles, // Spread any additional styles
      }}
      disabled={isLoading}
    >
      <Text 
        style={{
          color: textColor || '#8E1C1C', // Default text color
          fontSize: 20,  // Slightly smaller font size for rounded buttons
          fontWeight: 'bold',
          ...textStyles // Spread any additional text styles
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
