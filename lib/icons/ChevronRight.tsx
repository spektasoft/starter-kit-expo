import { forwardRef, ForwardRefExoticComponent } from 'react';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const ChevronRight: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <ChevronRightIcon {...props} />
));
iconWithClassName(ChevronRight);

export { ChevronRight };
