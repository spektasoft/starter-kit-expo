import { View } from 'react-native';

import { Text } from './ui/text';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View className="mx-12 items-center">
        <Text className="text-center text-lg leading-6 text-foreground">{title}</Text>
        <View className="my-2 rounded-md px-1">
          <Text className="text-foreground">{path}</Text>
        </View>
        <Text className="text-center text-lg leading-6 text-foreground">{description}</Text>
      </View>
    </View>
  );
};
