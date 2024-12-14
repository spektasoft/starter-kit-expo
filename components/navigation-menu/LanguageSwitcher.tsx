import { useTranslation } from '@refinedev/core';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressAlertDialog } from '../ProgressAlertDialog';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Text } from '~/components/ui/text';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { Language } from '~/lib/icons/Language';

export function LanguageSwitcher() {
  const [isChanging, setIsChanging] = useState(false);
  const insets = useSafeAreaInsets();
  const { translate: __, changeLocale } = useTranslation();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const setLocale = (locale: string) => {
    setIsChanging(true);
    changeLocale(locale);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <View className="flex flex-row items-center gap-2">
              <Language className="h-5 w-5 text-muted-foreground" />
              <Text className="hidden text-muted-foreground sm:flex">
                {__('navigationMenu.languageSwitcher.language')}
              </Text>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </View>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets} className="mt-1">
          <DropdownMenuItem onPress={() => setLocale('id')}>
            <Text className="text-foreground">Bahasa Indonesia</Text>
          </DropdownMenuItem>
          <DropdownMenuItem onPress={() => setLocale('en')}>
            <Text className="text-foreground">English</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isChanging && <ProgressAlertDialog title={__('progress.language')} />}
    </>
  );
}
