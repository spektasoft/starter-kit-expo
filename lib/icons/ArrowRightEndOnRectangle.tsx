import { forwardRef, ForwardRefExoticComponent } from 'react';
import { ArrowRightEndOnRectangleIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const ArrowRightEndOnRectangle: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <ArrowRightEndOnRectangleIcon {...props} />
));
iconWithClassName(ArrowRightEndOnRectangle);

export { ArrowRightEndOnRectangle };
