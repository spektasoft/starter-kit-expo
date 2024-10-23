import { forwardRef, ForwardRefExoticComponent } from 'react';
import { EyeSlashIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const EyeSlash: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <EyeSlashIcon {...props} />
));
iconWithClassName(EyeSlash);

export { EyeSlash };
