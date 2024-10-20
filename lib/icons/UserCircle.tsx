import { forwardRef, ForwardRefExoticComponent } from 'react';
import { UserCircleIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const UserCircle: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <UserCircleIcon {...props} />
));
iconWithClassName(UserCircle);

export { UserCircle };
