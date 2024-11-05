import { useDeleteButton } from '@refinedev/core';
import { RefineDeleteButtonProps } from '@refinedev/ui-types';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { Loading } from '../Loading';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button, ButtonProps } from '../ui/button';

import { Trash } from '~/lib/icons/Trash';

export type DeleteButtonProps = {
  title: string;
};

export const DeleteButton = (props: DeleteButtonProps & RefineDeleteButtonProps & ButtonProps) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const deleteButton = useDeleteButton({
    resource: props.resource,
    id: props.recordItemId,
    dataProviderName: props.dataProviderName,
    invalidates: props.invalidates,
    meta: props.meta,
    onSuccess: props.onSuccess,
    mutationMode: props.mutationMode,
    errorNotification: props.errorNotification,
    successNotification: props.successNotification,
    accessControl: props.accessControl,
  });

  return (
    <>
      <Button
        onPress={() => setIsConfirming(() => !isConfirming)}
        variant="ghost"
        disabled={deleteButton.disabled && props.disabled}
        {...props}>
        <View className="flex-row items-center gap-1">
          <Trash className="h-4 w-4 text-destructive" />
          <Text className="font-semibold text-destructive">
            {!props.hideText && (props.children ?? deleteButton.label)}
          </Text>
        </View>
      </Button>
      {isConfirming && (
        <AlertDialog defaultOpen>
          <AlertDialogContent className="m-2 w-full">
            <AlertDialogHeader>
              <View className="flex-row">
                <View className="rounded-full bg-destructive/20 p-3">
                  <Trash className="h-6 w-6 text-destructive" />
                </View>
              </View>
              <AlertDialogTitle>{props.title}</AlertDialogTitle>
              <AlertDialogDescription>{deleteButton.confirmTitle}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onPress={() => setIsConfirming(() => false)}>
                <Text className="text-foreground">{deleteButton.cancelLabel}</Text>
              </AlertDialogCancel>
              <Button
                variant="destructive"
                onPress={() => {
                  deleteButton.onConfirm();
                  setIsConfirming(() => false);
                }}>
                <Text className="text-destructive-foreground">{deleteButton.confirmOkLabel}</Text>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {deleteButton.loading && (
        <AlertDialog defaultOpen>
          <AlertDialogContent className="m-2 w-full">
            <AlertDialogHeader>
              <AlertDialogTitle>Deleting</AlertDialogTitle>
              <View className="flex flex-row items-center gap-2">
                <Loading />
                <AlertDialogDescription>Deleting, please wait…</AlertDialogDescription>
              </View>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};