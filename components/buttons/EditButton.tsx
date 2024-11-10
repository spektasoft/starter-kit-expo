import { useEditButton } from '@refinedev/core';
import type { RefineCreateButtonProps } from '@refinedev/ui-types';
import { Text } from 'react-native';

import { Button, ButtonProps } from '../ui/button';

export const EditButton = (props: RefineCreateButtonProps & ButtonProps) => {
  const { hidden, disabled, label } = useEditButton({
    resource: props.resource,
    accessControl: props.accessControl,
    meta: props.meta,
  });

  if (hidden) return null;

  return (
    <Button disabled={disabled && props.disabled} {...props}>
      <Text className="font-semibold text-primary-foreground">
        {!props.hideText && (props.children ?? label)}
      </Text>
    </Button>
  );
};
