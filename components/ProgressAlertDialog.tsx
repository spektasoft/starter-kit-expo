import { useTranslate } from '@refinedev/core';
import { View } from 'react-native';

import { Loading } from './Loading';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export const ProgressAlertDialog = (props: { title: string; message?: string }) => {
  const __ = useTranslate();

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="m-2 w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <View className="flex flex-row items-center gap-2">
            <Loading />
            <AlertDialogDescription>
              {props.message ?? __('progress.pleaseWait')}
            </AlertDialogDescription>
          </View>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
