import React,{useState}from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useLogin } from "@refinedev/core";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
export const Login = () => {
    const { mutate, isLoading } = useLogin();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        mutate({ username, password });
    };

    const handleRegister = () => {
        console.log("Redirect to register new user");
    };

    const handleForgotPassword = () => {
        console.log("Redirect to forgot password");
    };

    return (
      <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center p-6">
        <LinearGradient
          colors={['#4c1d95', '#7e22ce', '#4c1d95']}
          className="w-full max-w-md rounded-2xl p-8 shadow-lg"
        >
          <Text className="text-3xl font-bold text-white mb-6 text-center">Login</Text>
          
          <View className="space-y-4">
            <View>
              <Text className="text-white mb-2 text-sm">Username</Text>
              <TextInput
                className="bg-white bg-opacity-20 rounded-md p-3 text-white"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                placeholder="Enter your username"
		            value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            
            <View>
              <Text className="text-white mb-2 text-sm">Password</Text>
              <TextInput
                className="bg-white bg-opacity-20 rounded-md p-3 text-white"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                placeholder="Enter your password"
		            value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
          
          <TouchableOpacity className="bg-white rounded-md mt-6 p-3"
	          onPress={onSubmit}
           disabled={isLoading}		
	   >
            <Text className="text-purple-800 text-center font-bold">
	 {isLoading ? "Logging in..." : "Login"}
	</Text>
          </TouchableOpacity>
          
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity onPress={handleRegister}>
              <Text className="text-white text-sm">Register</Text>
		
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text className="text-white text-sm">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaView>
    );
};
