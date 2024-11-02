import { useApiUrl, useCustomMutation } from '@refinedev/core';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View, ViewProps } from 'react-native';

import { AuthenticationCard } from '~/components/AuthenticationCard';
import { Loading } from '~/components/Loading';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { EmailVerificationNotificationParams } from '~/providers/auth-provider/email/verification-notification';

type EmailVerificationProps = {
  wrapperProps?: ViewProps;
  contentProps?: ViewProps;
};

export const EmailVerificationPage = (props: EmailVerificationProps) => {
  const { handleSubmit } = useForm<EmailVerificationNotificationParams>({
    defaultValues: {
      type: 'email-verification-notification',
    },
  });

  const url = useApiUrl();

  const {
    mutate: verify,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useCustomMutation<EmailVerificationNotificationParams>();

  const onSubmit = (data: EmailVerificationNotificationParams) => {
    verify({
      url,
      method: 'post',
      values: data,
    });
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
      {isSuccess && (
        <Card className="mb-4">
          <CardHeader>
            <CardDescription>
              <Text className="text-sm font-medium text-green-600 dark:text-green-400">
                A new verification link has been sent to the email address you provided in your
                profile settings.
              </Text>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <Card {...props.contentProps}>
        <CardHeader>
          <View>
            <CardDescription className="font-semibold leading-6">
              Verify your email address
            </CardDescription>
            <CardDescription className="leading-6">
              Before continuing, could you verify your email address by clicking on the link we just
              emailed to you? If you didn't receive the email, we will gladly send you another.
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
                    <Text className="font-semibold text-primary hover:underline">Edit Profile</Text>
                  </Pressable>
                </Link>
                <Button onPress={handleSubmit(onSubmit)}>
                  <Text className="font-semibold text-primary-foreground">
                    Resend Verification Email
                  </Text>
                </Button>
                <Link href="/admin" asChild>
                  <Button variant="secondary">
                    <Text className="font-semibold text-secondary-foreground">Go to Dashboard</Text>
                  </Button>
                </Link>
              </>
            )}
            {isLoading && (
              <>
                <Loading />
                <Label className="font-bold">Sending…</Label>
              </>
            )}
          </View>
        </CardContent>
      </Card>
    </AuthenticationCard>
  );
};