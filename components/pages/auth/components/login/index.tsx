import { LoginPageProps } from '@refinedev/core';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { ScrollViewProps, Text, View, ViewProps } from 'react-native';

import { FormPropsType } from '../..';

import { AuthenticationCard } from '~/components/AuthenticationCard';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

type LoginProps = LoginPageProps<ScrollViewProps, ViewProps, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: unknown) => {
    console.log(data);
    router.replace('/admin');
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
                  <Input id="password" secureTextEntry />
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
