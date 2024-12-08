import { useTranslate } from '@refinedev/core';
import { View } from '@rn-primitives/slot';
import { Link } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeSwitcher } from '../ThemeSwitcher';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { ArrowRightEndOnRectangle } from '~/lib/icons/ArrowRightEndOnRectangle';
import { EllipsisVertical } from '~/lib/icons/EllipsesVertical';
import { UserCircle } from '~/lib/icons/UserCircle';

export function GuestMenu() {
  const insets = useSafeAreaInsets();
  const __ = useTranslate();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="aspect-square rounded-full">
            <EllipsisVertical className="text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets} className="mt-1">
          <DropdownMenuGroup className="flex flex-row items-center gap-2 p-2.5">
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <Text className="text-foreground">{__('navigationMenu.menu.guest')}</Text>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <View className="justify-center">
            <ThemeSwitcher />
          </View>
          <DropdownMenuSeparator />
          <Link href="/login" asChild>
            <DropdownMenuItem>
              <ArrowRightEndOnRectangle className="h-5 w-5 text-foreground" />
              <Text className="text-foreground">{__('navigationMenu.menu.loginRegister')}</Text>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
