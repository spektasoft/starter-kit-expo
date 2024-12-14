import { useCreateButton } from '@refinedev/core';
import type { RefineCreateButtonProps } from '@refinedev/ui-types';

import { Button, ButtonProps } from '../ui/button';

import { Text } from '~/components/ui/text';

export const CreateButton = (props: RefineCreateButtonProps & ButtonProps) => {
  const { hidden, disabled, label } = useCreateButton({
    resource: props.resource,
    accessControl: props.accessControl,
    meta: props.meta,
  });

  if (hidden) return null;

  return (
    <Button disabled={disabled && props.disabled} {...props}>
      <Text className="font-sans-semibold text-primary-foreground">
        {!props.hideText && (props.children ?? label)}
      </Text>
    </Button>
  );
};
