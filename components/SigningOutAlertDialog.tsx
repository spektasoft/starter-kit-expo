import { Text, View } from 'react-native';

import { Loading } from './Loading';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export const SigningOutAlertDialog = () => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="m-2 w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Signing out</AlertDialogTitle>
          <View className="flex flex-row items-center gap-2">
            <Loading />
            <Text className="text-foreground">Please wait…</Text>
          </View>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
