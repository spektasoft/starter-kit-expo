import { useForm } from '@refinedev/react-hook-form';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Text, View } from 'react-native';

import { InputPassword } from '~/components/InputPassword';
import { Loading } from '~/components/Loading';
import { CreateButton } from '~/components/buttons/CreateButton';
import { EditButton } from '~/components/buttons/EditButton';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { User } from '~/models/User';

export type UserFormProps = {
  action: 'create' | 'edit' | 'clone';
};

export const UserForm = (props: UserFormProps) => {
  const local = useLocalSearchParams();

  const {
    refineCore: { onFinish, formLoading, mutation },
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    refineCoreProps: {
      action: props.action,
      resource: 'users',
      id: local.id?.toString(),
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      reset();
      router.navigate('/admin/users');
    }
  }, [mutation.isSuccess]);

  return (
    <View>
      {mutation?.isError && (
        <Card className="mb-4">
          <CardHeader>
            <CardDescription>
              <Text className="font-medium text-destructive">
                Whoops! Something went wrong: {mutation.error?.message}
              </Text>
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardDescription>
            <Text className="font-semibold leading-6">User Details</Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <View className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={control}
              rules={{
                required: props.action === 'create' ? 'Name is required' : false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="grid gap-2">
                  <Label nativeID="name-label" htmlFor="name">
                    Name {props.action === 'create' && '*'}
                  </Label>
                  <Input
                    id="name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!formLoading}
                    aria-labelledby="name-label"
                    aria-errormessage="name-error"
                    autoComplete="name"
                    onSubmitEditing={handleSubmit(onFinish)}
                  />
                  {errors.email?.message && (
                    <Text nativeID="name-error" className="text-destructive-foreground">
                      {errors.name?.message?.toString()}
                    </Text>
                  )}
                </View>
              )}
              name="name"
            />

            <Controller
              control={control}
              rules={{
                required: props.action === 'create' ? 'Email is required' : false,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="grid gap-2">
                  <Label nativeID="email-label" htmlFor="email">
                    Email {props.action === 'create' && '*'}
                  </Label>
                  <Input
                    id="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!formLoading}
                    aria-labelledby="email-label"
                    aria-errormessage="email-error"
                    autoComplete="email"
                    onSubmitEditing={handleSubmit(onFinish)}
                  />
                  {errors.email?.message && (
                    <Text nativeID="email-error" className="text-destructive-foreground">
                      {errors.email?.message?.toString()}
                    </Text>
                  )}
                </View>
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{
                required: props.action === 'create' ? 'Password is required' : false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View className="grid gap-2">
                  <View className="flex flex-row items-center gap-4">
                    <Label nativeID="password-label" htmlFor="password">
                      Password {props.action === 'create' && '*'}
                    </Label>
                  </View>
                  <InputPassword
                    id="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={!formLoading}
                    aria-labelledby="password-label"
                    aria-errormessage="password-error"
                    autoComplete="password"
                    onSubmitEditing={handleSubmit(onFinish)}
                  />
                  {errors.password?.message && (
                    <Text nativeID="password-error" className="text-destructive-foreground">
                      {errors.password?.message?.toString()}
                    </Text>
                  )}
                </View>
              )}
              name="password"
            />
          </View>
        </CardContent>
        <CardContent>
          <View className="flex flex-row items-center justify-start gap-3">
            {!formLoading && (
              <>
                {props.action === 'create' && <CreateButton onPress={handleSubmit(onFinish)} />}
                {props.action === 'edit' && <EditButton onPress={handleSubmit(onFinish)} />}
                <Link href="/admin/users" asChild>
                  <Button variant="outline">
                    <Text className="font-semibold text-foreground">Cancel</Text>
                  </Button>
                </Link>
              </>
            )}
            {formLoading && (
              <>
                <Loading />
                <Label className="font-bold">Loading…</Label>
              </>
            )}
          </View>
        </CardContent>
      </Card>
    </View>
  );
};
