import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import mainStyles from './MainStyleSheet'
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, createUserWithEmailAndPassword, firestore } from "./firebase";
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

type FormValues = {
    email: string, 
    password: string,
    name: string,
    birthdate: Date,
    country: string,
    gender: string,
    biography: string
}
export default function SignUp({ navigation }) {
    const goToSignIn = () => navigation.navigate('signin');

    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>()
      
      const [date, setDate] = useState(new Date());

      const onSubmit: SubmitHandler<FormValues> = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log('User logged in');

            await setDoc(doc(firestore, 'users', user.uid), {
                email: user.email,
                name: data.name,
                biography: data.biography,
                birthdate: moment(data.birthdate).format('MM/DD/YYYY'),
                country: data.country,
                gender: data.gender,
                createdAt: new Date()
            })
            navigation.navigate('main');

            await AsyncStorage.setItem('userName', data.name);
            await AsyncStorage.setItem('userEmail', data.email);
        })
        .catch((error) => {
            alert(error.message)
        })
    }
      
      return (
        <View style={{ height: '100%', backgroundColor: '#6F4E37', padding: 20 }}>
            <Text style={mainStyles.label}>Email</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[mainStyles.input, { color: '#ffffff' }]}
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    cursorColor={'#ffffff'}
                />
                )}
                name="email"
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
            <Text style={mainStyles.label}>Name</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[mainStyles.input, { color: '#ffffff' }]}
                    placeholder="Name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    cursorColor={'#ffffff'}
                />
                )}
                name="name"
            />
            <Text style={mainStyles.label}>Birthdate</Text>
            <View style={{ alignItems: 'flex-start', paddingBottom: 10}}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <DateTimePicker
                        value={date}
                        mode='date'
                        onChange={onChange}
                    />
                )}
                name="birthdate"
            />
            </View>

            <Text style={mainStyles.label}>Country</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RNPickerSelect
                        onValueChange={(selectedValue) => {
                            onChange(selectedValue); 
                        }}
                        items={[
                        { label: 'United States', value: 'unitedStates' },
                        { label: 'Canada', value: 'canada' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{
                        label: 'Select an option...',
                        value: null,
                        color: '#ffffff',
                        }}
                        value={value}
                    />
                )}
                name="country"
            />
            <Text style={mainStyles.label}>Gender</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RNPickerSelect
                        onValueChange={(selectedValue) => {
                            onChange(selectedValue); 
                        }}
                        items={[
                        { label: 'F', value: 'f' },
                        { label: 'M', value: 'm' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{
                        label: 'Select an option...',
                        value: null,
                        color: '#ffffff',
                        }}
                        value={value}
                    />
                )}
                name="gender"
            />
            <Text style={mainStyles.label}>Biography</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={[mainStyles.multilineInput, { color: '#ffffff' }]}
                    placeholder="Tell us about yourself..."
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    cursorColor={'#ffffff'}
                    multiline={true}
                    numberOfLines={5}
                />
                )}
                name="biography"
            />
        <Pressable style={mainStyles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={mainStyles.buttonText}>Sign Up</Text>
        </Pressable>
      <Text style={mainStyles.label}>Already have an account?</Text>
      <Pressable style={mainStyles.button} onPress={goToSignIn}>
            <Text style={mainStyles.buttonText}>Sign In</Text>
        </Pressable>
    </View>
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        borderWidth: .3,
        borderColor: '#ffffff',
        borderRadius: 20,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 12,
        paddingRight: 20,
        paddingLeft: 10,
        color: '#ffffff'
    }
});