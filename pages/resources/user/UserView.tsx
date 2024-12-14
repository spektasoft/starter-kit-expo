import { ScrollView, View } from 'react-native';

import { UserForm } from './UserForm';

export const UserView = () => {
  return (
    <ScrollView>
      <View className="gap-y-8 px-4 py-8 md:px-6 lg:px-8">
        <UserForm action="view" />
      </View>
    </ScrollView>
  );
};
