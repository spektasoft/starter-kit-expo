import { View } from '@rn-primitives/slot';
import { Text } from 'react-native';

import { Container } from '~/components/Container';
import { Card, CardHeader } from '~/components/ui/card';
import { InformationCircle } from '~/lib/icons/InformationCircle';

export default function Forbidden() {
  return (
    <>
      <Container>
        <View className="mx-auto">
          <Card>
            <CardHeader className="items-center gap-2">
              <InformationCircle className="h-8 w-8 text-foreground" />
              <Text className="text-lg text-foreground">
                You have no permission to access this feature.
              </Text>
            </CardHeader>
          </Card>
        </View>
      </Container>
    </>
  );
}
