import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import HomeScreen from './index';
import LearnTab from './learn';
import RecipesTab from './recipes';
export default function TabLayout() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } else {
            iconName = 'home';
          }

          return <Icon name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnTab}
        options={{ title: 'Learn' }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesTab}
        options={{ title: 'Recipes' }}
      />
    </Tab.Navigator>
  );
}
