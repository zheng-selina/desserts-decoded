import { View, Text, TextInput, Pressable } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import mainStyles from './MainStyleSheet'
import React, { useEffect, useState } from 'react';
import { auth, signInWithEmailAndPassword } from './firebase'
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormValues = {
  username: string
  password: string
}
export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const goToSignUp = () => navigation.navigate('signup');

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        signInWithEmailAndPassword(auth, data.username, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('main');
        })
    }

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('userEmail');

                if (savedEmail) {
                    setEmail(savedEmail);
                    setValue('username', savedEmail);
                } else {
                    setEmail('');
                }
            } catch (error) {
                console.error('Failed to load user data from Async Storage:', error);
            }
        };
        loadUserData();
    }, []);

    return (
        <View style={{ height: '100%', backgroundColor: '#6F4E37', padding: 20 }}>
            <Text style={mainStyles.label}>Username</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[mainStyles.input, { color: '#ffffff' }]}
                    placeholder="Username"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                        setEmail(text);
                        onChange(text); 
                      }}
                    value={email}
                    cursorColor={'#ffffff'}
                />
                )}
                name="username"
            />
            <Text style={mainStyles.label}>Password</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[mainStyles.input, { color: '#ffffff' }]}
                    placeholder="Password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    cursorColor={'#ffffff'}
                    secureTextEntry={true}
                />
                )}
                name="password"
            />
            <Pressable style={mainStyles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={mainStyles.buttonText}>Sign In</Text>
            </Pressable>      
            <Text style={mainStyles.label}>Not a member yet?</Text>
            <Pressable style={mainStyles.button} onPress={goToSignUp}>
                <Text style={mainStyles.buttonText}>Sign Up</Text>
            </Pressable>      
        </View>
    )
}