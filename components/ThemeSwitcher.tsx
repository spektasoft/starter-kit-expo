import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import { Button } from './ui/button';

import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Moon } from '~/lib/icons/Moon';
import { Sun } from '~/lib/icons/Sun';
import { useColorScheme } from '~/lib/useColorScheme';

export function ThemeSwitcher() {
  return (
    <View className="flex flex-row space-x-1">
      <LightToggle />
      <DarkToggle />
    </View>
  );
}

function DarkToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      onPress={() => {
        setColorScheme('dark');
        setAndroidNavigationBar('dark');
        AsyncStorage.setItem('theme', 'dark');
      }}
      variant={isDarkColorScheme ? 'secondary' : 'ghost'}>
      <View>
        <Moon className={`h-5 w-5 ${isDarkColorScheme ? 'text-primary' : 'text-foreground'}`} />
      </View>
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
      variant={!isDarkColorScheme ? 'secondary' : 'ghost'}>
      <View>
        <Sun className={`h-5 w-5 ${!isDarkColorScheme ? 'text-primary' : 'text-foreground'}`} />
      </View>
    </Button>
  );
}
