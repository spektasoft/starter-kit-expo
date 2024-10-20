import { forwardRef, ForwardRefExoticComponent } from 'react';
import { ChevronUpIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const ChevronUp: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <ChevronUpIcon {...props} />
));
iconWithClassName(ChevronUp);

export { ChevronUp };
