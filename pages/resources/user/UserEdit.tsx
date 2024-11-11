import { ScrollView, Text, View } from 'react-native';

import { UserForm } from './UserForm';

export const UserEdit = () => {
  return (
    <ScrollView>
      <View className="gap-y-8 px-4 py-8 md:px-6 lg:px-8">
        <View className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Text className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Edit User
          </Text>
        </View>
        <UserForm action="edit" />
      </View>
    </ScrollView>
  );
};