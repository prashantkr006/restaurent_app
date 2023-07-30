// src/navigation/MainNavigator.tsx

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CompletedOrders from '../screens/CompletedOrders';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabelStyle: {
          paddingBottom: 8, // Customize the padding bottom for tab labels
        },
        tabBarActiveTintColor: 'white', // Text and icon color for active tab
        tabBarInactiveTintColor: 'black', // Text and icon color for inactive tabs
        tabBarActiveBackgroundColor: '#007bff', // Background color for active tab
        tabBarInactiveBackgroundColor: 'white', // Background color for inactive tabs
        tabBarStyle: {
          borderTopWidth: 1, // Add a border at the top of the tab bar
          borderColor: '#ccc', // Customize the border color
        },
      })}>
      <Tab.Screen
        name="Active Orders"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Active Orders',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="clipboard-check"
              size={size}
              color={focused ? 'white' : 'blue'}
              style={{marginTop: focused ? 0 : 6}} // Adjust the icon's position
            />
          ),
        }}
      />
      <Tab.Screen
        name="Completed Orders"
        component={CompletedOrders}
        options={{
          tabBarLabel: 'Completed Orders',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="clipboard-check-multiple"
              size={size}
              color={focused ? 'white' : 'blue'}
              style={{marginTop: focused ? 0 : 6}} // Adjust the icon's position
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
