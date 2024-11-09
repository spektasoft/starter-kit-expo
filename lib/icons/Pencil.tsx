import { forwardRef, ForwardRefExoticComponent } from 'react';
import { PencilIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Pencil: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <PencilIcon {...props} />
));
iconWithClassName(Pencil);

export { Pencil };
