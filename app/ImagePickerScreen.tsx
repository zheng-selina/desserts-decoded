import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import mainStyles from './MainStyleSheet';

const ImagePickerScreen = () => {
    const [selectedImage, setSelectedImage] = useState('');

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access the media library is required');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1 
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const styles = StyleSheet.create({
        image: {
            width: 300,
            height: 300,
            borderRadius: 70
        }
    });

    return (
        <View style={{backgroundColor: '#6F4E37', height:'100%', paddingTop:20}}>
            <Pressable onPress={pickImage} style={mainStyles.button}>
                <Text style={mainStyles.buttonText}>Pick an image</Text>
            </Pressable>
            <View style={{alignItems:'center'}}>
                {selectedImage && (
                    <Image source={{ uri: selectedImage }} style={styles.image}/>
                )}
            </View>
        </View>
    )
}

export default ImagePickerScreen;