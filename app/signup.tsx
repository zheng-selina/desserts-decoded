import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import mainStyles from './MainStyleSheet'
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

type FormValues = {
    email: string, 
    password: string,
    name: string,
    birthdate: Date,
    country: string,
    gender: string,
    biography: string
}
export default function SignUp() {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormValues>()
      
      const [date, setDate] = useState(new Date());
    
      const onChange = (selectedDate: any) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };

      const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log('Sign Up data')
        console.log(data)
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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} color='#ffffff' />
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