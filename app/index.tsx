import { Stack, Link } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <View className="flex gap-2">
          <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
            <Button title="Show Details" />
          </Link>
          <Link href={{ pathname: '/products', params: {} }} asChild>
            <Button title="Products" />
          </Link>
        </View>
      </Container>
    </>
  );
}
