import { View } from 'react-native';

import { AuthenticationCardLogo } from './AuthenticationCardLogo';

export const AuthenticationCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex flex-col items-center sm:justify-center">
      <View>
        <AuthenticationCardLogo />
      </View>
      <View className="mt-6 w-full max-w-screen-sm px-2 sm:px-4">{children}</View>
    </View>
  );
};
