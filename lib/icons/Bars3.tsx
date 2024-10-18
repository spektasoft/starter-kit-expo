import { forwardRef, ForwardRefExoticComponent } from 'react';
import { Bars3Icon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Bars3: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <Bars3Icon {...props} />
));
iconWithClassName(Bars3);

export { Bars3 };
