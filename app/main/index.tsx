import { Image, StyleSheet, View, Text, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState} from 'react';
import mainStyles from '../MainStyleSheet';
import { getAuth, onAuthStateChanged } from '../firebase'

export default function HomeScreen({ navigation, route }) {
  const [email, setEmail] = useState('');
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user && user.email) {
      setEmail(user.email)
    } else {
      setEmail('')
    }
  })
  const logout = () => {
    auth
    .signOut()
    .then(() => {
      navigation.navigate('start')
    })
    .catch(error => alert(error.message))
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6F4E37', dark: '#6F4E37' }}
      headerImage={
        <Image
          source={require('@/assets/images/desserts-home.jpg')}
          style={styles.dessertsHome}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Desserts Decoded!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Join us as we learn more about desserts and tackle the world of baking!</ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          Ever wonder about the origins of your favorite desserts?
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          Looking for the best recipes?
        </ThemedText>
      </ThemedView>
      <ThemedView>
        <ThemedText>
          Here is your one-stop shop for delicious desserts.
        </ThemedText>
      </ThemedView>
      <View>
        <Text style={mainStyles.label}>{email}</Text>
        <Pressable style={mainStyles.button} onPress={logout}>
          <Text style={mainStyles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  dessertsHome: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
  },
});
