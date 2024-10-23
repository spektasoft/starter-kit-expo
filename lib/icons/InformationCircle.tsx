import { forwardRef, ForwardRefExoticComponent } from 'react';
import { InformationCircleIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const InformationCircle: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <InformationCircleIcon {...props} />
));
iconWithClassName(InformationCircle);

export { InformationCircle };
