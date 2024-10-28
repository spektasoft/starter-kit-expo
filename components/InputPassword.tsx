import { forwardRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { Button } from './ui/button';
import { Input } from './ui/input';

import { Eye } from '~/lib/icons/Eye';
import { EyeSlash } from '~/lib/icons/EyeSlash';
import { cn } from '~/lib/utils';

const InputPassword = forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, ...props }, ref) => {
  const [hidden, setHidden] = useState(true);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  return (
    <View className="flex-row">
      <Input
        secureTextEntry={hidden}
        className={cn('flex-1 rounded-r-none', className)}
        {...props}
        ref={ref}
      />
      <Button className="-z-10 rounded-l-none border-l-0" variant="outline" onPress={toggleHidden}>
        {hidden ? (
          <Eye className="h-5 w-5 text-foreground" />
        ) : (
          <EyeSlash className="h-5 w-5 text-foreground" />
        )}
      </Button>
    </View>
  );
});

InputPassword.displayName = 'InputPassword';

export { InputPassword };
