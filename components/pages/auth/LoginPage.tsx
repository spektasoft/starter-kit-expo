import { LoginPageProps, useLogin } from '@refinedev/core';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { ScrollViewProps, Text, View, ViewProps } from 'react-native';

import { FormPropsType } from './AuthPage';

import { AuthenticationCard } from '~/components/AuthenticationCard';
import { InputPassword } from '~/components/InputPassword';
import { Loading } from '~/components/Loading';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { LoginParams } from '~/providers/auth-provider/login';

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
  const { mutate, error, isLoading, isError } = useLogin();
  const onSubmit = (data: LoginParams) => {
    mutate(data);
  };

  return (
    <AuthenticationCard {...props.wrapperProps}>
      {isError && (
        <Card className="mb-4">
          <CardHeader>
            <CardDescription>
              <Text className="font-medium text-red-600 dark:text-red-400">
                Whoops! Something went wrong: {error.message}
              </Text>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
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
                    editable={!isLoading}
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
                  <InputPassword
                    id="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!isLoading}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                  />
                </View>
              )}
              name="password"
            />
          </View>
        </CardContent>
        <CardContent>
          <View className="flex flex-row items-center justify-end gap-3">
            {!isLoading && (
              <>
                <Link href="/">
                  <Text className="font-semibold text-primary hover:underline">Sign up</Text>
                </Link>
                <Button onPress={handleSubmit(onSubmit)}>
                  <Text className="font-semibold text-primary-foreground">Login</Text>
                </Button>
              </>
            )}
            {isLoading && (
              <>
                <Loading />
                <Label className="font-bold">Logging in…</Label>
              </>
            )}
          </View>
        </CardContent>
      </Card>
    </AuthenticationCard>
  );
};
