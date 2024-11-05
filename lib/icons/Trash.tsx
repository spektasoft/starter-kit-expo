import { forwardRef, ForwardRefExoticComponent } from 'react';
import { TrashIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Trash: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <TrashIcon {...props} />
));
iconWithClassName(Trash);

export { Trash };
