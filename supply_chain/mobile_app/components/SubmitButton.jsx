import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';

const SubmitButton = ({ 
  title, 
  handlePress, 
  containerStyles, 
  textStyles, 
  isLoading, 
  disabled 
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading || disabled} // Disable the button if loading or explicitly disabled
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: disabled ? '#000' : '#000', // Black background, slightly gray if disabled
        paddingVertical: 15, // Padding for vertical height
        paddingHorizontal: 20, // Padding for horizontal space
        borderRadius: 10, // Rounded corners
        ...containerStyles // Spread any additional container styles
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" /> // White loader while processing
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
  );
};

export default SubmitButton;
