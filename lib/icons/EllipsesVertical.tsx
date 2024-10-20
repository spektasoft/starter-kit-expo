import { forwardRef, ForwardRefExoticComponent } from 'react';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const EllipsisVertical: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <EllipsisVerticalIcon {...props} />
));
iconWithClassName(EllipsisVertical);

export { EllipsisVertical };
