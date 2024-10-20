import { cssInterop } from 'nativewind';
import { ForwardRefExoticComponent } from 'react';
import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  'data-testid'?: string;
  variant?: 'default' | 'solid';
}
type Icon = ForwardRefExoticComponent<IconProps>;

export function iconWithClassName(icon: Icon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}
