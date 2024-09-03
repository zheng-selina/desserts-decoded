import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
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
