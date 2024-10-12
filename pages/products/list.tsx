import { useTable } from '@refinedev/core';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export const ListProducts = () => {
  const {
    tableQuery: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    resource: 'products',
    sorters: { initial: [{ field: 'id', order: 'asc' }] },
  });

  if (isLoading) {
    return <Text className="text-center text-lg">Loading...</Text>;
  }

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1);
    }
  };

  const onPage = (page) => {
    setCurrent(page);
  };

  const getSorter = (field) => {
    const sorter = sorters?.find((sorter) => sorter.field === field);
    return sorter?.order;
  };

  const onSort = (field) => {
    const sorter = getSorter(field);
    setSorters(
      sorter === 'desc'
        ? []
        : [
            {
              field,
              order: sorter === 'asc' ? 'desc' : 'asc',
            },
          ]
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
      <Text className="mb-6 text-center text-3xl font-bold">Products</Text>

      <View className="rounded-lg border border-gray-300">
        <View className="flex flex-row bg-gray-200 p-2">
          <TouchableOpacity className="flex-1" onPress={() => onSort('id')}>
            <Text className="text-center font-bold">ID</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1" onPress={() => onSort('name')}>
            <Text className="text-center font-bold">Name</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1" onPress={() => onSort('description')}>
            <Text className="text-center font-bold">Description</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1" onPress={() => onSort('price')}>
            <Text className="text-center font-bold">Price</Text>
          </TouchableOpacity>
        </View>

        {data?.data?.map((product) => (
          <View key={product.id} className="flex flex-row border-b border-gray-200 p-2">
            <Text className="flex-1 text-center">{product.id}</Text>
            <Text className="flex-1 text-center">{product.name}</Text>
            <Text className="flex-1 text-center">{product.description}</Text>
            <Text className="flex-1 text-center">{product.price}</Text>
          </View>
        ))}
      </View>

      <View className="mt-6 flex flex-row items-center justify-center">
        <TouchableOpacity onPress={onPrevious} disabled={current <= 1}>
          <Text className="px-3 text-lg text-blue-500">{'<'}</Text>
        </TouchableOpacity>

        {current - 1 > 0 && (
          <TouchableOpacity onPress={() => onPage(current - 1)}>
            <Text className="px-2 text-lg text-blue-500">{current - 1}</Text>
          </TouchableOpacity>
        )}

        <Text className="px-2 text-lg font-bold">{current}</Text>

        {current + 1 <= pageCount && (
          <TouchableOpacity onPress={() => onPage(current + 1)}>
            <Text className="px-2 text-lg text-blue-500">{current + 1}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onNext} disabled={current >= pageCount}>
          <Text className="px-3 text-lg text-blue-500">{'>'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
