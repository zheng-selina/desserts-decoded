import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './index';
import LearnTab from './learn';
import RecipesTab from './recipes';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const tabNavigation = useNavigation(); 
  const tabRoutes = ['Home', 'Learn', 'Recipes'];
  var currentTabIndex = 0; 

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 20;
      },
      onPanResponderEnd: (evt, gestureState) => {
        if (gestureState.dx > 0) {
          handleSwipe('right');
        } else if (gestureState.dx < 0) {
          handleSwipe('left');
        }
      },
    })
  ).current;

  const handleSwipe = (direction) => {
    console.log(direction, currentTabIndex)
    if (direction === 'left' && currentTabIndex < tabRoutes.length - 1) {
      currentTabIndex = currentTabIndex + 1
      tabNavigation.navigate(tabRoutes[currentTabIndex]);
    } else if (direction === 'right' && currentTabIndex > 0) {
      currentTabIndex = currentTabIndex - 1;
      tabNavigation.navigate(tabRoutes[currentTabIndex]);
    }
  };

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            let iconName = 'home';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Learn') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Recipes') {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
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
    </View>
  );
}