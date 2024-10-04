import { useLogin } from '@refinedev/core';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export const Login = () => {
  const { mutate, isLoading } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    mutate({ username, password });
  };

  const handleRegister = () => {
    console.log('Redirect to register new user');
  };

  const handleForgotPassword = () => {
    console.log('Redirect to forgot password');
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center p-6">
        <LinearGradient
          colors={['#4c1d95', '#7e22ce', '#4c1d95']}
          className="w-full max-w-md rounded-2xl p-8 shadow-lg">
          <Text className="mb-6 text-center text-3xl font-bold text-white">Login</Text>

          <View className="space-y-4">
            <View>
              <Text className="mb-2 text-sm text-white">Username</Text>
              <TextInput
                className="rounded-md bg-white bg-opacity-20 p-3 text-white"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="mb-2 text-sm text-white">Password</Text>
              <TextInput
                className="rounded-md bg-white bg-opacity-20 p-3 text-white"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            className="mt-6 rounded-md bg-white p-3"
            onPress={onSubmit}
            disabled={isLoading}>
            <Text className="text-center font-bold text-purple-800">
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <View className="mt-4 flex-row justify-between">
            <TouchableOpacity onPress={handleRegister}>
              <Text className="text-sm text-white">Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text className="text-sm text-white">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
