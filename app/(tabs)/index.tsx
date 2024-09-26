import { Image, StyleSheet, Platform } from 'react-native';
import { Refine, Authenticated } from "@refinedev/core";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Login } from "./pages/login.tsx";
import { ListProducts } from "./pages/products/list.tsx";
import { dataProvider } from "./providers/data-provider";
import { authProvider } from "./providers/auth-provider";
export default function HomeScreen() {
  return (
    <Refine
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
      <Authenticated
        key="protected"
        fallback={<Login />}
      >
        {/* <ShowProduct /> */}
        {/* <EditProduct /> */}
        <ListProducts />
        {/* <CreateProduct /> */}
      </Authenticated>
    </Refine>
  );
}

