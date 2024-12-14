import { forwardRef, ForwardRefExoticComponent } from 'react';
import { TrashIcon as TrashMiniIcon } from 'react-native-heroicons/mini';
import { TrashIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const Trash: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => {
  if (props.variant === 'mini') {
    return <TrashMiniIcon {...props} />;
  }
  return <TrashIcon {...props} />;
});
iconWithClassName(Trash);

export { Trash };
