import { useTranslate } from '@refinedev/core';
import { View } from '@rn-primitives/slot';
import React from 'react';

import { Container } from '~/components/Container';
import { Card, CardHeader } from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { InformationCircle } from '~/lib/icons/InformationCircle';

export default function Forbidden() {
  const __ = useTranslate();

  return (
    <>
      <Container>
        <View className="mx-auto">
          <Card>
            <CardHeader className="items-center gap-2">
              <InformationCircle className="h-8 w-8 text-foreground" />
              <Text className="text-lg text-foreground">{__('This action is unauthorized.')}</Text>
            </CardHeader>
          </Card>
        </View>
      </Container>
    </>
  );
}
