import { Href, useFocusEffect, useRouter } from 'expo-router';

export function Navigate({ href }: { href: Href }) {
  const router = useRouter();
  useFocusEffect(() => {
    try {
      router.navigate(href);
    } catch (error) {
      console.error(error);
    }
  });
  return null;
}
