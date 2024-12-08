import { useGetIdentity, useLogout, useTranslate } from '@refinedev/core';
import { View } from '@rn-primitives/slot';
import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProgressAlertDialog } from '../ProgressAlertDialog';
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
import { BuildingLibrary } from '~/lib/icons/BuildingLibrary';
import { EllipsisVertical } from '~/lib/icons/EllipsesVertical';
import { Home } from '~/lib/icons/Home';
import { Key } from '~/lib/icons/Key';
import { User } from '~/lib/icons/User';
import { UserCircle } from '~/lib/icons/UserCircle';
import { User as UserModel } from '~/models/User';
import { Loading } from '../Loading';

export function UserMenu({ type }: { type: 'app' | 'admin' }) {
  const { data: user, isFetching } = useGetIdentity<UserModel>();
  const insets = useSafeAreaInsets();
  const __ = useTranslate();

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
            <UserCircle className="h-5 w-5 text-muted-foreground" variant="solid" />
            {isFetching ? <Loading /> : <Text className="text-foreground">{user?.name}</Text>}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <View className="justify-center">
            <ThemeSwitcher />
          </View>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {type === 'admin' && (
              <Link href="/" asChild>
                <DropdownMenuItem>
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <Text className="text-foreground">{__('Home')}</Text>
                </DropdownMenuItem>
              </Link>
            )}
            {type === 'app' && (
              <Link href="/admin" asChild>
                <DropdownMenuItem>
                  <BuildingLibrary className="h-5 w-5 text-muted-foreground" />
                  <Text className="text-foreground">{__('Dashboard')}</Text>
                </DropdownMenuItem>
              </Link>
            )}
            <Link href="/wip" asChild>
              <DropdownMenuItem>
                <User className="h-5 w-5 text-muted-foreground" />
                <Text className="text-foreground">{__('Profile')}</Text>
              </DropdownMenuItem>
            </Link>
            <Link href="/wip" asChild>
              <DropdownMenuItem>
                <Key className="h-5 w-5 text-muted-foreground" />
                <Text className="text-foreground">{__('API Tokens')}</Text>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem asChild>
              <Pressable onPress={signOut} disabled={isLoading}>
                <ArrowLeftEndOnRectangle className="h-5 w-5 text-muted-foreground" />
                <Text className="text-foreground">{__('Logout')}</Text>
              </Pressable>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isLoading && <ProgressAlertDialog title={__('progress.logout')} />}
    </>
  );
}
