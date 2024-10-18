import { forwardRef, ForwardRefExoticComponent } from 'react';
import { HomeIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Home: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <HomeIcon {...props} />
));
iconWithClassName(Home);

export { Home };
