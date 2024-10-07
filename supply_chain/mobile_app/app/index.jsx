import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Link} from 'expo-router';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>App </Text>
      <Link href="/qr" style={{color:'red'}}>qr</Link>
      <Link href="/nextStep">nexttep</Link>           
      <Link href="/sign-in">SignIn</Link>             
      <Link href="/sign-up">SignUp</Link>              
    </View>
  )
}

export default App

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        },
})