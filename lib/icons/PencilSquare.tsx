import { forwardRef, ForwardRefExoticComponent } from 'react';
import { PencilSquareIcon as PencilSquareMiniIcon } from 'react-native-heroicons/mini';
import { PencilSquareIcon } from 'react-native-heroicons/outline';

import { IconProps, iconWithClassName } from './iconWithClassName';

const PencilSquare: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => {
  if (props.variant === 'mini') {
    return <PencilSquareMiniIcon {...props} />;
  }
  return <PencilSquareIcon {...props} />;
});
iconWithClassName(PencilSquare);

export { PencilSquare };
