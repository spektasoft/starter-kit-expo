import { forwardRef, ForwardRefExoticComponent } from 'react';
import { BuildingLibraryIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const BuildingLibrary: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => (
  <BuildingLibraryIcon {...props} />
));
iconWithClassName(BuildingLibrary);

export { BuildingLibrary };
