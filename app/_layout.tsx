import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './signup';
import SignIn from './signin';
import TabLayout from './main/_layout';

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
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="main" component={TabLayout} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={SignUp} options={{ title: 'Sign Up'}}/>
        <Stack.Screen name="signin" component={SignIn} options={{ title: 'Sign In'}}/>
      </Stack.Navigator>
    </ThemeProvider>
  );
}
