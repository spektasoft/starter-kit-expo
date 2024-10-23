import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';

export const Loading = ({ withText }: { withText?: boolean }) => {
  const { colors } = useTheme();
  return (
    <View className="items-center gap-2">
      <ActivityIndicator color={colors.primary} />
      {withText && <Text className="text-foreground">Loading…</Text>}
    </View>
  );
};
