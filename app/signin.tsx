import { View, Text, TextInput, Button, Pressable } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import mainStyles from './MainStyleSheet'
import React from 'react';
import { auth, signInWithEmailAndPassword } from './firebase'

type FormValues = {
  username: string
  password: string
}
export default function SignIn({ navigation }) {
    const goToSignUp = () => navigation.navigate('signup');

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        signInWithEmailAndPassword(auth, data.username, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email);
            navigation.navigate('main', {
                email: user.email
            });
        })
    }

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
                    onChangeText={onChange}
                    value={value}
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