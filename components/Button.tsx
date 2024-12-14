import { forwardRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { Text } from './ui/text';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<typeof TouchableOpacity, ButtonProps>(
  ({ title, ...touchableProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        className={`items-center rounded-[28px] bg-indigo-500 p-4 shadow-md ${touchableProps.className}`}>
        <Text className="font-sans-semibold text-center text-lg text-white">{title}</Text>
      </TouchableOpacity>
    );
  }
);
