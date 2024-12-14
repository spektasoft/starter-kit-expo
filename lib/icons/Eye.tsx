import { forwardRef, ForwardRefExoticComponent } from 'react';
import { EyeIcon as EyeMiniIcon } from 'react-native-heroicons/mini';
import { EyeIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Eye: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => {
  if (props.variant === 'mini') {
    return <EyeMiniIcon {...props} />;
  }
  return <EyeIcon {...props} />;
});
iconWithClassName(Eye);

export { Eye };
