import { useLogin, useTranslate } from '@refinedev/core';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Pressable, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import { AuthenticationCard } from '~/components/AuthenticationCard';
import { Loading } from '~/components/Loading';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';
import { LoginIdUnavailableError } from '~/errors/LoginIdUnavailableError';
import { TwoFactorChallengeParams } from '~/providers/auth-provider/two-factor-challenge';

type TwoFactorChallengeProps = {
  wrapperProps?: ViewProps;
  contentProps?: ViewProps;
};

export const TwoFactorChallengePage = (props: TwoFactorChallengeProps) => {
  const [showRecovery, setShowRecovery] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<TwoFactorChallengeParams>({
    defaultValues: {
      code: '',
      recoveryCode: '',
    },
  });
  const { mutate: challenge, error, isLoading, isError } = useLogin<TwoFactorChallengeParams>();
  const __ = useTranslate();

  const onSubmit = (data: TwoFactorChallengeParams) => {
    challenge(data);
  };

  useEffect(() => {
    if (isError && error.name === LoginIdUnavailableError.name) {
      router.navigate('/login');
    }
  }, [isError]);

  return (
    <AuthenticationCard {...props.wrapperProps}>
      {isError && (
        <Card className="mb-4">
          <CardHeader>
            <CardDescription>
              <Text className="font-medium text-red-600 dark:text-red-400">
                {__('Whoops! Something went wrong.')} {error.message}
              </Text>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <Card {...props.contentProps}>
        <CardHeader>
          <View>
            <CardDescription className="font-sans-semibold leading-6">
              Two Factor Authentication
            </CardDescription>
            <CardDescription className="leading-6">
              {showRecovery
                ? __(
                    'Please confirm access to your account by entering one of your emergency recovery codes.'
                  )
                : __(
                    'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
                  )}
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent>
          <Controller
            control={control}
            rules={{
              required: `${showRecovery ? __('Recovery Code') : __('Code')} ${__('is required')}`,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="grid gap-2">
                <Label nativeID="code-label">
                  {showRecovery ? `${__('Recovery Code')} *` : `${__('Code')} *`}
                </Label>
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!isLoading}
                  aria-labelledby="code-label"
                  aria-errormessage="code-error"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
                <Text nativeID="code-error" className="text-red-600 dark:text-red-400">
                  {errors.code?.message || errors.recoveryCode?.message}
                </Text>
              </View>
            )}
            name={showRecovery ? 'recoveryCode' : 'code'}
          />
        </CardContent>
        <CardContent>
          <View className="flex items-end justify-end gap-3 sm:flex-row sm:items-center">
            {!isLoading && (
              <>
                <Pressable
                  onPress={() => {
                    clearErrors();
                    setShowRecovery(() => !showRecovery);
                  }}>
                  <Text className="font-sans-semibold text-primary hover:underline">
                    {showRecovery ? 'Use an authentication code' : 'Use a recovery code'}
                  </Text>
                </Pressable>
                <Button onPress={handleSubmit(onSubmit)}>
                  <Text className="font-sans-semibold text-primary-foreground">{__('Login')}</Text>
                </Button>
              </>
            )}
            {isLoading && (
              <>
                <Loading />
                <Label className="font-bold">{__('progress.login')}…</Label>
              </>
            )}
          </View>
        </CardContent>
      </Card>
    </AuthenticationCard>
  );
};
