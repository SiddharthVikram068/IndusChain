import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-semibold">{title}</Text>

      <View
        className={`w-full h-12 px-4 rounded-lg flex flex-row items-center border-2 ${
          isFocused ? "border-brown-600 shadow-md" : "border-gray-300"
        }`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }} // Transparent white background
      >
        <TextInput
          className="flex-1 text-black font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {/* <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;


