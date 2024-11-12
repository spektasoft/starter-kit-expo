import { LoginPageProps, useLogin, useTranslation } from '@refinedev/core';
import { Link, router } from 'expo-router';
import { useEffect } from 'react';
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
import { TwoFactorChallengeError } from '~/errors/TwoFactorChallengeError';
import { LoginParams } from '~/providers/auth-provider/login';

type LoginProps = LoginPageProps<ScrollViewProps, ViewProps, FormPropsType>;

export const LoginPage: React.FC<LoginProps> = (props) => {
  const { translate: __ } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutate, error, isLoading, isError } = useLogin();
  const onSubmit = (data: LoginParams) => {
    mutate(data);
  };

  useEffect(() => {
    if (isError && error.name === TwoFactorChallengeError.name) {
      router.navigate('/two-factor-challenge');
    }
  }, [isError]);

  return (
    <AuthenticationCard {...props.wrapperProps}>
      {isError && error.message !== '' && (
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
            <Text className="font-semibold leading-6">{__('auth:login:heading')}</Text>
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
                  <Label nativeID="email-label" htmlFor="email">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!isLoading}
                    aria-labelledby="email-label"
                    aria-errormessage="email-error"
                    autoComplete="email"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  {errors.email?.message && (
                    <Text nativeID="email-error" className="text-red-600 dark:text-red-400">
                      {errors.email?.message}
                    </Text>
                  )}
                </View>
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: 'Password is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="grid gap-2">
                  <View className="flex flex-row items-center gap-4">
                    <Label nativeID="password-label" htmlFor="password">
                      Password *
                    </Label>
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
                    aria-labelledby="password-label"
                    aria-errormessage="password-error"
                    autoComplete="password"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  {errors.password?.message && (
                    <Text nativeID="password-error" className="text-red-600 dark:text-red-400">
                      {errors.password?.message}
                    </Text>
                  )}
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
