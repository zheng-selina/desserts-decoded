import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LearnTab() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6F4E37', dark: '#6F4E37' }}
      headerImage={
        <Image
          source={require('@/assets/images/desserts-home.jpg')}
          style={styles.dessertsHome}
        />
      }>
      <ThemedView>
        <ThemedText>
          Here, we will explore different desserts and learn more about them.
        </ThemedText>
      </ThemedView>
      </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dessertsHome: {
    height: 300,
    width: 500,
    bottom: 0,
    left: 0,
  },
});
