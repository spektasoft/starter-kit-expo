import { forwardRef, ForwardRefExoticComponent } from 'react';
import { ChevronDownIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const ChevronDown: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <ChevronDownIcon {...props} />
));
iconWithClassName(ChevronDown);

export { ChevronDown };
