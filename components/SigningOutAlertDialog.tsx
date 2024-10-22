import { useTheme } from '@react-navigation/native';
import { ActivityIndicator, Text, View } from 'react-native';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export const SigningOutAlertDialog = () => {
  const { colors } = useTheme();
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="m-2 w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Signing out</AlertDialogTitle>
          <View className="flex flex-row items-center gap-2">
            <ActivityIndicator color={colors.primary} />
            <Text className="text-foreground">Please wait…</Text>
          </View>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
