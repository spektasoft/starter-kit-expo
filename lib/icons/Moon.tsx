import { forwardRef, ForwardRefExoticComponent } from 'react';
import { MoonIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Moon: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <MoonIcon {...props} />
));
iconWithClassName(Moon);

export { Moon };
