import ParallaxScrollView from "@/components/ParallaxScrollView";
import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
export default function RecipesTab() {
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
              We have compiled the best recipes for all your baking needs.
            </ThemedText>
          </ThemedView>
          </ParallaxScrollView>
        
      );
}

const styles = StyleSheet.create({
    dessertsHome: {
      height: 300,
      width: 500,
      bottom: 0,
      left: 0,
    },
  });
  