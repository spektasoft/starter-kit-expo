import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemeSwitcher } from '../ThemeSwitcher';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { Button } from '~/components/ui/button';
import { EllipsisVertical } from '~/lib/icons/EllipsesVertical';

export function GuestMenu() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <EllipsisVertical className="text-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent insets={contentInsets}>
          <ThemeSwitcher />
        </PopoverContent>
      </Popover>
    </>
  );
}
