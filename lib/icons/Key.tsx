import { forwardRef, ForwardRefExoticComponent } from 'react';
import { KeyIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Key: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <KeyIcon {...props} />
));
iconWithClassName(Key);

export { Key };
