import { forwardRef, ForwardRefExoticComponent } from 'react';
import { EyeIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Eye: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <EyeIcon {...props} />
));
iconWithClassName(Eye);

export { Eye };
