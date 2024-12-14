import { View } from '@rn-primitives/slot';
import { Link } from 'expo-router';
import React from 'react';

import { Container } from '~/components/Container';
import { Button } from '~/components/ui/button';
import { Card, CardHeader } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Home } from '~/lib/icons/Home';
import { InformationCircle } from '~/lib/icons/InformationCircle';

export default function WIP() {
  return (
    <>
      <Container>
        <View className="mx-auto">
          <Card>
            <CardHeader className="items-center gap-2">
              <InformationCircle className="h-8 w-8 text-foreground" />
              <Text className="text-lg text-foreground">
                This feature is not available yet. Check again later.
              </Text>
              <Link href="/" asChild>
                <Button variant="outline" className="flex flex-row gap-2">
                  <Home className="h-5 w-5 text-foreground" />
                  <Text className="text-foreground">Back to Home</Text>
                </Button>
              </Link>
            </CardHeader>
          </Card>
        </View>
      </Container>
    </>
  );
}
