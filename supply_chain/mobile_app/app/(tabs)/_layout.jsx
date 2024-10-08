import { View, Text,Image } from 'react-native'
import React from 'react'
import {Tabs,Redirect} from 'expo-router'

const TabIcon = ({icon,color,name,focused}) =>{
    return (
        <View>
            <Image
            
            />

        </View>

    )
}


const TabsLayout = () => {
  return (
    <>
    <Tabs>
        <Tabs.Screen 
        
        name="home"
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({color,focused}) => (
                <TabIcon
                
                />
            )
        }}
        />
        </Tabs>

    </>
  )
}
 
export default TabsLayout