import { useTable } from '@refinedev/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { DeleteButton } from '~/components/buttons/DeleteButton';
import { Button } from '~/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { ChevronUp } from '~/lib/icons/ChevronUp';
import { cn } from '~/lib/utils';
import { User } from '~/models/User';

const MIN_COLUMN_WIDTHS = [120, 220, 200, 100];

export const UserList = () => {
  const { width } = useWindowDimensions();
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
      },
      {
        id: 'email',
        header: 'Email address',
        accessorKey: 'email',
      },
      {
        id: 'created_at',
        header: 'Created at',
        accessorFn: (user) => new Date(user.created_at).toLocaleString(),
      },
    ],
    []
  );

  const { getHeaderGroups, getRowModel } = useTable({
    columns,
    refineCoreProps: {
      resource: 'users',
    },
  });

  const columnWidths = useMemo(() => {
    return MIN_COLUMN_WIDTHS.map((minWidth) => {
      const evenWidth = width / MIN_COLUMN_WIDTHS.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width]);

  return (
    <ScrollView>
      <View className="gap-y-8 py-8">
        <View className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between md:px-6 lg:px-8">
          <Text className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Users
          </Text>
          <View className="flex-row">
            <Link href="/admin/users/create" asChild>
              <Button>
                <Text className="text-primary-foreground">New user</Text>
              </Button>
            </Link>
          </View>
        </View>
        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
          <Table aria-labelledby="post-table">
            <TableHeader>
              {getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header, index) => (
                      <TableHead key={header.id} style={{ width: columnWidths[index] }}>
                        <Pressable onPress={header.column.getToggleSortingHandler()}>
                          <View className="flex-row items-center gap-x-1">
                            <Text className="text-sm font-semibold text-foreground">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </Text>
                            {{
                              asc: <ChevronUp className="h-4 w-4 text-foreground" />,
                              desc: <ChevronDown className="h-4 w-4 text-foreground" />,
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </View>
                        </Pressable>
                      </TableHead>
                    ))}
                    <TableHead
                      key={`${headerGroup.id}-actions`}
                      style={{ width: columnWidths[columnWidths.length - 1] }}
                    />
                  </TableRow>
                );
              })}
            </TableHeader>
            <TableBody>
              {getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn('active:bg-secondary', index % 2 && 'bg-muted/40')}>
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableCell key={cell.id} style={{ width: columnWidths[index] }}>
                        <Text className="text-foreground">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Text>
                      </TableCell>
                    );
                  })}
                  <View className="flex-row items-center justify-end">
                    <DeleteButton
                      resource="users"
                      recordItemId={row.original.id}
                      title={`Delete ${row.original.name}`}
                    />
                  </View>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
