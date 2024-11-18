import { forwardRef, ForwardRefExoticComponent } from 'react';
import { LanguageIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Language: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <LanguageIcon {...props} />
));
iconWithClassName(Language);

export { Language };
