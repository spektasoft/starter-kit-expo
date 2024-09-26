import { Stack, Link } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { Login } from "./pages/login.tsx";
import { ListProducts } from "./pages/products/list.tsx";
import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";
import { Refine, Authenticated } from "@refinedev/core";
import { Header } from "./pages/components/header.tsx";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
      <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        <Header/>
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
