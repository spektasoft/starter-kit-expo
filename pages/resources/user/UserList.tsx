import { CanAccess, useTranslate } from '@refinedev/core';
import { useTable } from '@refinedev/react-table';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import { Link } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
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
import { Text } from '~/components/ui/text';
import { ChevronDown } from '~/lib/icons/ChevronDown';
import { ChevronUp } from '~/lib/icons/ChevronUp';
import { Eye } from '~/lib/icons/Eye';
import { PencilSquare } from '~/lib/icons/PencilSquare';
import { cn } from '~/lib/utils';
import { User } from '~/models/User';

const MIN_COLUMN_WIDTHS = [120, 220, 200, 100];

export const UserList = () => {
  const { width } = useWindowDimensions();
  const __ = useTranslate();

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'name',
        header: __('Name'),
        accessorKey: 'name',
      },
      {
        id: 'email',
        header: __('Email'),
        accessorKey: 'email',
      },
      {
        id: 'createdAt',
        header: __('validation.attributes.createdAt'),
        accessorFn: (user) => new Date(user.created_at).toLocaleString(),
      },
    ],
    []
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: {
      tableQuery: { isFetching },
    },
  } = useTable({
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
        <View className="flex w-full flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-end md:px-6 lg:px-8">
          <View className="flex flex-col sm:flex-row">
            <CanAccess action="create" resource="users">
              <Link href="/admin/users/create" asChild>
                <Button>
                  <Text className="font-sans-bold text-primary-foreground">
                    {__('Create')} {__('user.resource.modelLabel')}
                  </Text>
                </Button>
              </Link>
            </CanAccess>
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
                            <Text className="font-sans-semibold text-sm text-foreground">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                            </Text>
                            {{
                              asc: <ChevronUp className="text-foreground" size={16} />,
                              desc: <ChevronDown className="text-foreground" size={16} />,
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronDown className="text-muted-foreground" size={16} />
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
              {!isFetching &&
                getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40')}>
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <TableCell key={cell.id} style={{ width: columnWidths[index] }}>
                          <Text className="text-sm text-foreground">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Text>
                        </TableCell>
                      );
                    })}
                    <View className="flex-row items-center justify-end">
                      <CanAccess action="view" resource="users" params={{ id: row.original.id }}>
                        <Link href={`/admin/users/${row.original.id}`} asChild>
                          <Button variant="ghost">
                            <View className="flex-row items-center gap-1">
                              <Eye className="text-muted-foreground" size={16} variant="mini" />
                              <Text className="font-sans-semibold text-sm text-foreground">
                                {__('View')}
                              </Text>
                            </View>
                          </Button>
                        </Link>
                      </CanAccess>
                      <CanAccess action="update" resource="users" params={{ id: row.original.id }}>
                        <Link href={`/admin/users/${row.original.id}/edit`} asChild>
                          <Button variant="ghost">
                            <View className="flex-row items-center gap-1">
                              <PencilSquare className="text-primary" size={16} variant="mini" />
                              <Text className="font-sans-semibold text-sm text-primary">
                                {__('Edit')}
                              </Text>
                            </View>
                          </Button>
                        </Link>
                      </CanAccess>
                    </View>
                    <CanAccess action="delete" resource="users" params={{ id: row.original.id }}>
                      <View className="flex-row items-center justify-end">
                        <DeleteButton
                          resource="users"
                          recordItemId={row.original.id}
                          title={`${__('Delete')} ${row.original.name}`}
                        />
                      </View>
                    </CanAccess>
                  </TableRow>
                ))}
              {isFetching && (
                <Container>
                  <Loading withText />
                </Container>
              )}
            </TableBody>
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
