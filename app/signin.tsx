import { View, Text, TextInput, Button } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import mainStyles from './MainStyleSheet'
import React from 'react';

type FormValues = {
  username: string
  password: string
}
export default function SignIn() {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Sign In data:')
        console.log(data)
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
            <Button title="Sign In" onPress={handleSubmit(onSubmit)} color='#ffffff' />
        </View>
    )
}