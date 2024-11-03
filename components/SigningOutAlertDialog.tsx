import { View } from 'react-native';

import { Loading } from './Loading';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
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
            <AlertDialogDescription>Signing out, please wait…</AlertDialogDescription>
          </View>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
