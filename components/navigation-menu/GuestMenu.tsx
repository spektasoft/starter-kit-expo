import { View } from '@rn-primitives/slot';
import { Link } from 'expo-router';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeSwitcher } from '../ThemeSwitcher';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { ArrowRightEndOnRectangle } from '~/lib/icons/ArrowRightEndOnRectangle';
import { EllipsisVertical } from '~/lib/icons/EllipsesVertical';
import { UserCircle } from '~/lib/icons/UserCircle';

export function GuestMenu() {
  const insets = useSafeAreaInsets();
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
          <Button variant="ghost">
            <EllipsisVertical className="text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent insets={contentInsets} className="mt-1">
          <DropdownMenuLabel className="flex flex-row items-center gap-2 px-4 py-2">
            <UserCircle className="h-5 w-5 text-foreground" />
            <Text className="text-foreground">Guest</Text>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <View className="justify-center">
            <ThemeSwitcher />
          </View>
          <DropdownMenuSeparator />
          <Link href="/admin" asChild>
            <Button variant="ghost" className="flex flex-row items-center gap-2">
              <ArrowRightEndOnRectangle className="h-5 w-5 text-foreground" />
              <Text className="text-foreground">Login/Register</Text>
            </Button>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
