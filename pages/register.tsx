import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegister } from '@refinedev/core';
import { useNavigation } from '@react-navigation/native';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  username: yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
  streetaddress: yup.string().required('Street address is required'),
});

type FormData = {
  email: string;
  username: string;
  password: string;
  phone: string;
  streetaddress: string;
};

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const { mutate: register, isLoading } = useRegister();
  const navigation = useNavigation();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await register({
        email: data.email,
        username: data.username,
        password: data.password,
        phone: data.phone,
        streetaddress: data.streetaddress,
      });

      if (result.success) {
        // Redirect to the desired path
        navigation.navigate(result.redirectTo || 'HomeScreen');

        // Show success notification
        Alert.alert(
          result.successNotification.message,
          result.successNotification.description
        );
      } else {
        Alert.alert("Registration Failed", "Something went wrong, please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white p-4">
      <View className="w-full max-w-md mx-auto">
        <Text className="text-2xl font-bold mb-6 text-center">Register</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-4 text-lg"
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-red-500 mb-4">{errors.email.message}</Text>}

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-4 text-lg"
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text className="text-red-500 mb-4">{errors.username.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-4 text-lg"
              placeholder="Password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text className="text-red-500 mb-4">{errors.password.message}</Text>}

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-4 text-lg"
              placeholder="Phone Number"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.phone && <Text className="text-red-500 mb-4">{errors.phone.message}</Text>}

        <Controller
          control={control}
          name="streetaddress"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border border-gray-300 rounded-md p-3 mb-4 text-lg"
              placeholder="Street Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.streetaddress && <Text className="text-red-500 mb-4">{errors.streetaddress.message}</Text>}

        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-md mb-4"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting || isLoading}
        >
          <Text className="text-white text-center text-lg">
            {isSubmitting || isLoading ? "Registering..." : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
