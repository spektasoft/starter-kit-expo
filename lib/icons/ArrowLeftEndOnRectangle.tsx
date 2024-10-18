import { forwardRef, ForwardRefExoticComponent } from 'react';
import { ArrowLeftEndOnRectangleIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const ArrowLeftEndOnRectangle: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <ArrowLeftEndOnRectangleIcon {...props} />
));
iconWithClassName(ArrowLeftEndOnRectangle);

export { ArrowLeftEndOnRectangle };
