import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './signup';
import SignIn from './signin';
import TabLayout from './main/_layout';
import Start from './start';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './main';
import LearnTab from './main/learn';
import RecipesTab from './main/recipes';
import ImagePickerScreen from './ImagePickerScreen';
import LocationScreen from './LocationScreen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  function HomeDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={HomeScreen}/>
        <Drawer.Screen name="Image Picker" component={ImagePickerScreen}/>
        <Drawer.Screen name="Location" component={LocationScreen}/>
        {/* <Drawer.Screen name='Learn' component={LearnTab}/>
        <Drawer.Screen name='Recipes' component={RecipesTab}/> */}
      </Drawer.Navigator>
    )
  }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="start" component={Start} options={{ title: 'Welcome'}}/>
        <Stack.Screen name="signin" component={SignIn} options={{ title: 'Sign In', headerBackVisible: false}}/>
        <Stack.Screen name="signup" component={SignUp} options={{ title: 'Sign Up', headerBackVisible: false}}/>
        {/* <Stack.Screen name="main" component={TabLayout} options={{ headerShown: false }} /> */}
        <Stack.Screen name="main" options={{ headerShown: false }} component={HomeDrawer}/>
      </Stack.Navigator>
    </ThemeProvider>
  );
}
