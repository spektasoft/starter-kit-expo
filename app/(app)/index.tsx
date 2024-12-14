import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';

export default function Home() {
  return (
    <>
      <ScrollView>
        <Container>
          <ScreenContent path="app/index.tsx" title="Home" />
          <View className="mt-4 flex gap-2">
            <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
              <Button>
                <Text className="text-primary-foreground">Show Details</Text>
              </Button>
            </Link>
          </View>
        </Container>
      </ScrollView>
    </>
  );
}
