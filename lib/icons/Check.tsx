import { forwardRef, ForwardRefExoticComponent } from 'react';
import { CheckIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Check: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <CheckIcon {...props} />
));
iconWithClassName(Check);

export { Check };
