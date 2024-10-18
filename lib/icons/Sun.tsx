import { forwardRef, ForwardRefExoticComponent } from 'react';
import { SunIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Sun: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <SunIcon {...props} />
));
iconWithClassName(Sun);

export { Sun };
