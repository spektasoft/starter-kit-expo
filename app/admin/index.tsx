import { useGetIdentity, useLogout, useTranslate } from '@refinedev/core';
import { Text, View } from 'react-native';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { ProgressAlertDialog } from '~/components/ProgressAlertDialog';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardTitle } from '~/components/ui/card';
import { ArrowLeftEndOnRectangle } from '~/lib/icons/ArrowLeftEndOnRectangle';
import { User } from '~/models/User';

export default function Dashboard() {
  const { data: user, isFetching } = useGetIdentity<User>();
  const { mutate, isLoading } = useLogout();
  const __ = useTranslate();

  const signOut = () => {
    mutate();
  };

  return (
    <>
      <Container>
        <View className="flex gap-y-8 py-8">
          <View className="grid sm:grid-cols-2">
            <Card>
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-col space-y-1.5 p-6">
                  <CardTitle>{__('Welcome')}</CardTitle>
                  <CardDescription>
                    {isFetching ? (
                      <Loading />
                    ) : (
                      <Text className="text-foreground">{user?.name}</Text>
                    )}
                  </CardDescription>
                </View>
                <View className="p-6">
                  <Button variant="secondary" className="hidden sm:flex" onPress={signOut}>
                    <View className="flex flex-row items-center space-x-1.5">
                      <ArrowLeftEndOnRectangle className="text-secondary-foreground" />
                      <Text className="text-secondary-foreground">{__('Logout')}</Text>
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
