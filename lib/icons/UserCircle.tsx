import { forwardRef, ForwardRefExoticComponent } from 'react';
import { UserCircleIcon } from 'react-native-heroicons/outline';
import { UserCircleIcon as UserCircleSolidIcon } from 'react-native-heroicons/solid';

import { IconProps, iconWithClassName } from './iconWithClassName';

const UserCircle: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => {
  if (props.variant === 'solid') {
    return <UserCircleSolidIcon {...props} />;
  }
  return <UserCircleIcon {...props} />;
});
iconWithClassName(UserCircle);

export { UserCircle };
