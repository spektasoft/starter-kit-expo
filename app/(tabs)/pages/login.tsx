import React from "react";
import { useLogin } from "@refinedev/core";
import  { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity } from 'react-native';


export const Login = () => {
    const { mutate, isLoading } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Using FormData to get the form values and convert it to an object.
      const data = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
      // Calling mutate to submit with the data we've collected from the form.
      mutate(data);
    };

    return (
      <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-4">Login</Text>

      <View className="w-4/5">
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-4 text-lg"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-6 text-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-blue-500 p-3 rounded-md"
          onPress={onSubmit}
        >
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
};