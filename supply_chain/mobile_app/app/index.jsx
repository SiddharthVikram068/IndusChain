import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {Link} from 'expo-router'
import { StatusBar } from 'expo-status-bar';
export default function App()
{
  return(
    // <View style={styles.container}>
      <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-psemibold"> 

        CargoChain
      </Text>
      <StatusBar style="auto"/>


      <Link href="/home">Go to home</Link>

    </View>
  );
}



