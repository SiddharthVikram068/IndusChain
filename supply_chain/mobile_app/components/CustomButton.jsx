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
        borderWidth: 3,  // Thick border
        borderColor: borderColor || '#8E1C1C',  // Default maroon shade
        borderRadius: 10,  // Rounded corners
        minHeight: 55,  // Reduced height
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // No fill
        ...containerStyles, // Spread any additional styles
      }}
      disabled={isLoading}
    >
      <Text 
        style={{
          color: textColor || '#8E1C1C', // Default text color
          fontSize: 24,
          ...textStyles // Spread any additional text styles
        }}
      >
        {title}  {/* Ensure title is wrapped in Text */}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
