import { useLogout } from '@refinedev/core';
import { View } from '@rn-primitives/slot';
import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SigningOutAlertDialog } from '../SigningOutAlertDialog';
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
import { ArrowLeftEndOnRectangle } from '~/lib/icons/ArrowLeftEndOnRectangle';
import { EllipsisVertical } from '~/lib/icons/EllipsesVertical';
import { Home } from '~/lib/icons/Home';
import { Key } from '~/lib/icons/Key';
import { User } from '~/lib/icons/User';
import { UserCircle } from '~/lib/icons/UserCircle';

export function UserMenu() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const { mutate, isLoading } = useLogout();
  const signOut = () => {
    mutate();
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
            <UserCircle className="h-5 w-5 text-foreground" variant="solid" />
            <Text className="text-foreground">Admin</Text>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <View className="justify-center">
            <ThemeSwitcher />
          </View>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/" asChild>
              <DropdownMenuItem>
                <Home className="h-5 w-5 text-foreground" />
                <Text className="text-foreground">Home</Text>
              </DropdownMenuItem>
            </Link>
            <Link href="/" asChild>
              <DropdownMenuItem>
                <User className="h-5 w-5 text-foreground" />
                <Text className="text-foreground">Profile</Text>
              </DropdownMenuItem>
            </Link>
            <Link href="/" asChild>
              <DropdownMenuItem>
                <Key className="h-5 w-5 text-foreground" />
                <Text className="text-foreground">API Tokens</Text>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem asChild>
              <Pressable onPress={signOut} disabled={isLoading}>
                <ArrowLeftEndOnRectangle className="h-5 w-5 text-foreground" />
                <Text className="text-foreground">Sign out</Text>
              </Pressable>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isLoading && <SigningOutAlertDialog />}
    </>
  );
}
