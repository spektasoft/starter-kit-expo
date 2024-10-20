import { forwardRef, ForwardRefExoticComponent } from 'react';
import { UserIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const User: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <UserIcon {...props} />
));
iconWithClassName(User);

export { User };
