import { FormContextType, IconButtonProps, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';
import { Button } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';

export default function IconButton() {
  return (
    <Button variant={'secondary'} size='slim'>
      Icon
    </Button>
  );
}

export function CopyButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;
  return <Button icon={PlusIcon}>{translateString(TranslatableString.MoveUpButton)}</Button>;
}

export function MoveDownButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;
  return <Button icon={PlusIcon}>{translateString(TranslatableString.MoveUpButton)}</Button>;
}

export function MoveUpButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;
  return <Button icon={PlusIcon}>{translateString(TranslatableString.MoveUpButton)}</Button>;
}

export function RemoveButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>(
  props: IconButtonProps<T, S, F>
) {
  const {
    registry: { translateString },
  } = props;
  return <Button icon={PlusIcon}>{translateString(TranslatableString.MoveUpButton)}</Button>;
}
