import { Refine, Authenticated } from '@refinedev/core';
import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { Header } from '~/pages/components/header';
import { Login } from '~/pages/login';
import { ListProducts } from '~/pages/products/list';
import { authProvider } from '~/providers/auth-provider';
import { dataProvider } from '~/providers/data-provider';

export default function Products() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Refine dataProvider={dataProvider} authProvider={authProvider}>
          <Authenticated key="protected" fallback={<Login />}>
            <Header />
            {/* <ShowProduct /> */}
            {/* <EditProduct /> */}
            <ListProducts />
            {/* <CreateProduct /> */}
          </Authenticated>
        </Refine>
      </Container>
    </>
  );
}
