import { useTheme } from '@react-navigation/native';
import { useTranslate } from '@refinedev/core';
import { ActivityIndicator, View } from 'react-native';

import { Text } from './ui/text';

export const Loading = ({ withText }: { withText?: boolean }) => {
  const { colors } = useTheme();
  const __ = useTranslate();

  return (
    <View className="items-center gap-2">
      <ActivityIndicator color={colors.primary} />
      {withText && <Text className="text-foreground">{__('progress.loading')}</Text>}
    </View>
  );
};
