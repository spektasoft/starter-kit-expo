import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewRef } from '@rn-primitives/types';
import { createContext, forwardRef, useContext } from 'react';
import { View, ViewProps } from 'react-native';

import { Button } from './ui/button';

import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Moon } from '~/lib/icons/Moon';
import { Sun } from '~/lib/icons/Sun';
import { useColorScheme } from '~/lib/useColorScheme';
import { cn } from '~/lib/utils';

const ThemeSwitcherClassContext = createContext<string | undefined>(undefined);

const ThemeSwitcher = forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => {
  const themeSwitcherClass = useContext(ThemeSwitcherClassContext);
  return (
    <View className={cn('flex flex-row gap-1', themeSwitcherClass, className)} ref={ref} {...props}>
      <LightToggle />
      <DarkToggle />
    </View>
  );
});

function DarkToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      onPress={() => {
        setColorScheme('dark');
        setAndroidNavigationBar('dark');
        AsyncStorage.setItem('theme', 'dark');
      }}
      variant={isDarkColorScheme ? 'secondary' : 'ghost'}
      className="aspect-[3/1]">
      <Moon className={`h-5 w-5 ${isDarkColorScheme ? 'text-primary' : 'text-foreground'}`} />
    </Button>
  );
}

function LightToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      onPress={() => {
        setColorScheme('light');
        setAndroidNavigationBar('light');
        AsyncStorage.setItem('theme', 'light');
      }}
      variant={!isDarkColorScheme ? 'secondary' : 'ghost'}
      className="aspect-[3/1]">
      <Sun className={`h-5 w-5 ${!isDarkColorScheme ? 'text-primary' : 'text-foreground'}`} />
    </Button>
  );
}

export { ThemeSwitcher, ThemeSwitcherClassContext };
