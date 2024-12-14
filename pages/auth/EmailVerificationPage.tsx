import { useApiUrl, useCustomMutation, useTranslate } from '@refinedev/core';
import { Link } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View, ViewProps } from 'react-native';

import { AuthenticationCard } from '~/components/AuthenticationCard';
import { Loading } from '~/components/Loading';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';

type EmailVerificationProps = {
  wrapperProps?: ViewProps;
  contentProps?: ViewProps;
};

export const EmailVerificationPage = (props: EmailVerificationProps) => {
  const url = useApiUrl();
  const { mutate: verify, isLoading, isError, isSuccess, error } = useCustomMutation();
  const { handleSubmit } = useForm({
    defaultValues: {},
  });
  const __ = useTranslate();

  const onSubmit = () => {
    verify({
      url,
      method: 'post',
      values: 'email-verification-notification',
    });
  };

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
      {isSuccess && (
        <Card className="mb-4">
          <CardHeader>
            <CardDescription>
              <Text className="text-sm font-medium text-green-600 dark:text-green-400">
                {__(
                  'A new verification link has been sent to the email address you provided in your profile settings.'
                )}
              </Text>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <Card {...props.contentProps}>
        <CardHeader>
          <View>
            <CardDescription className="font-sans-semibold leading-6">
              Verify your email address
            </CardDescription>
            <CardDescription className="leading-6">
              {__(
                "Before continuing, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
              )}
            </CardDescription>
          </View>
        </CardHeader>
        <CardContent />
        <CardContent>
          <View className="flex items-end justify-end gap-3 sm:flex-row sm:items-center">
            {!isLoading && (
              <>
                <Link href="/wip" asChild>
                  <Pressable>
                    <Text className="font-sans-semibold text-primary hover:underline">
                      {__('Edit Profile')}
                    </Text>
                  </Pressable>
                </Link>
                <Button onPress={handleSubmit(onSubmit)}>
                  <Text className="font-sans-semibold text-primary-foreground">
                    {__('Resend Verification Email')}
                  </Text>
                </Button>
                <Link href="/admin" asChild>
                  <Button variant="secondary">
                    <Text className="font-sans-semibold text-secondary-foreground">
                      {__('Go to Dashboard')}
                    </Text>
                  </Button>
                </Link>
              </>
            )}
            {isLoading && (
              <>
                <Loading />
                <Label className="font-bold">{__('progress.send')}…</Label>
              </>
            )}
          </View>
        </CardContent>
      </Card>
    </AuthenticationCard>
  );
};
