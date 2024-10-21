import { LoginPageProps, useLogin } from '@refinedev/core';
import * as Device from 'expo-device';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { Platform, ScrollViewProps, Text, View, ViewProps } from 'react-native';

import { FormPropsType } from '../..';

import { AuthenticationCard } from '~/components/AuthenticationCard';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { LoginParams, Strategy } from '~/providers/auth-provider/login';

type LoginProps = LoginPageProps<ScrollViewProps, ViewProps, FormPropsType>;

const determineDeviceName = () => {
  if (Device.modelName) {
    return Device.modelName;
  } else if (Device.deviceName) {
    return Device.deviceName;
  } else {
    if (Platform.OS === 'web') {
      return 'Web';
    } else if (Platform.OS === 'android') {
      return 'Android';
    } else if (Platform.OS === 'ios') {
      return 'iOS';
    } else {
      return 'Unknown Device';
    }
  }
};

const determineStrategy = (): Strategy => {
  if (Platform.OS === 'web') {
    return 'spa';
  } else {
    return 'native';
  }
};

export const LoginPage: React.FC<LoginProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      deviceName: determineDeviceName(),
      strategy: determineStrategy(),
    },
  });
  const { mutate } = useLogin();
  const onSubmit = (data: LoginParams) => {
    mutate(data);
  };

  return (
    <AuthenticationCard {...props.wrapperProps}>
      <Card {...props.contentProps}>
        <CardHeader>
          <CardDescription>
            <Text className="font-semibold leading-6">Login to your account</Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View className="grid gap-4">
            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="grid gap-2">
                  <Label nativeID="email">Email</Label>
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                  />
                </View>
              )}
              name="email"
            />
            {errors.email?.message && (
              <Text className="text-foreground">{errors.email?.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="grid gap-2">
                  <View className="flex flex-row items-center gap-4">
                    <Label nativeID="password">Password</Label>
                    <Link href="/" className="ml-auto inline-block">
                      <Text className="font-semibold text-primary hover:underline">
                        Forgot your password?
                      </Text>
                    </Link>
                  </View>
                  <Input
                    id="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                    secureTextEntry
                  />
                </View>
              )}
              name="password"
            />
          </View>
        </CardContent>
        <CardContent>
          <View className="flex flex-row items-center justify-end gap-3">
            <Link href="/">
              <Text className="font-semibold text-primary hover:underline">Sign up</Text>
            </Link>
            <Button onPress={handleSubmit(onSubmit)}>
              <Text className="font-semibold text-primary-foreground">Login</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </AuthenticationCard>
  );
};
