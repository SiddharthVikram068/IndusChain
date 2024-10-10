import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center">
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    tintColor: focused ? color : '#2c3e50', // Changes icon color on focus
                    width: 22,  // Slightly reduced icon size
                    height: 22,
                    marginBottom: 4, // Adjust spacing between icon and text
                }}
            />
            
            <Text
                style={{
                    fontSize: 11,  // Reduced font size for a more compact look
                    color: focused ? color : '#7f8c8d', // Softer color for inactive tabs
                    fontWeight: focused ? '600' : '400', // Bold for active tab
                }}
            >
                {name}
            </Text>
        </View>
    );
};


const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false, // Hide default labels
                    tabBarActiveTintColor:'#C3190B',
                    tabBarInactiveTintColor:'#00eeff',
                    tabBarStyle: {
                        backgroundColor: '#fdfdfd', // Lighter background color for a modern look
                        height: 55, // Reduced height for a compact design
                        borderTopWidth: 1,
                        borderTopColor: '#ecf0f1',
                        borderTopLeftRadius: 15, // Adds rounded corners for a softer look
                        borderTopRightRadius: 15,
                        shadowColor: "#000", // Adds subtle shadow for depth
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 0,  // For Android shadow
                        paddingBottom: 3,  // Adjusted spacing for better alignment

                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.map}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="CreateProductScreen"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.create}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        ),
                    }}


                />
                <Tabs.Screen
                    name="productDetails"
                    options={{
                        title: 'Details',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.details}
                                color={color}
                                name="Details"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="scan"
                    options={{
                        title: 'Scan',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.qr}
                                color={color}
                                name="Scan"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
