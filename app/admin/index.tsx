import { useLogout, useTranslate } from '@refinedev/core';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { ProgressAlertDialog } from '~/components/ProgressAlertDialog';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardTitle } from '~/components/ui/card';
import { ArrowLeftEndOnRectangle } from '~/lib/icons/ArrowLeftEndOnRectangle';

export default function Dashboard() {
  const { mutate, isLoading } = useLogout();
  const __ = useTranslate();

  const signOut = () => {
    mutate();
  };

  return (
    <>
      <Container>
        <View className="flex gap-y-8 py-8">
          <View className="flex gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Text className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
              Dashboard
            </Text>
          </View>
          <View className="grid sm:grid-cols-2">
            <Card>
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-col space-y-1.5 p-6">
                  <CardTitle>Welcome</CardTitle>
                  <CardDescription>Admin</CardDescription>
                </View>
                <View className="p-6">
                  <Button variant="secondary" className="hidden sm:flex" onPress={signOut}>
                    <View className="flex flex-row items-center space-x-1.5">
                      <ArrowLeftEndOnRectangle className="text-secondary-foreground" />
                      <Text className="text-secondary-foreground">Sign out</Text>
                    </View>
                  </Button>
                  <Button variant="ghost" className="sm:hidden" onPress={signOut}>
                    <View className="flex flex-row items-center space-x-1.5">
                      <ArrowLeftEndOnRectangle className="text-secondary-foreground" />
                    </View>
                  </Button>
                </View>
              </View>
            </Card>
          </View>
        </View>
      </Container>
      {isLoading && <ProgressAlertDialog title={__('progress.logout')} />}
    </>
  );
}
