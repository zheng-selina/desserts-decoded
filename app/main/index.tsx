import { Image, StyleSheet, View, Text, Pressable, ActivityIndicator, Animated } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState, useRef } from 'react';
import mainStyles from '../MainStyleSheet';
import { auth, firestore } from '../firebase'
import { doc, DocumentData, getDoc } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [userData, setUserData] = useState<DocumentData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }  else {
            console.log('No such document');
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [])
  
  const logout = () => {
    auth
    .signOut()
    .then(() => {
      navigation.navigate('start')
    })
    .catch(error => alert(error.message))
  }
  const scaleAnim = useRef(new Animated.Value(0.2)).current; 

  useEffect(() => {
    Animated.sequence([
      Animated.delay(2000), 
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 5, 
        friction: 10,  
        useNativeDriver: true,
      }),
       
    ]).start(); 
  }, [scaleAnim]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0782F9"/>;
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
        <View>
        <Text style={mainStyles.label}>{'Email: ' + userData?.email}</Text>
        <Text style={mainStyles.label}>{'Name: ' + userData?.name}</Text>
        </View>
      <ThemedView style={styles.titleContainer}>
      <Animated.View
        style={[
          { transform: [{ scale: scaleAnim }] },
        ]}>
        <ThemedText type="title">Welcome to Desserts Decoded!</ThemedText>
        </Animated.View>
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
