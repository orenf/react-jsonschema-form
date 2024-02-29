import { FormContextType, IconButtonProps, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';
import { Button } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';

export default function AddButton<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  registry,
}: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return <Button icon={PlusIcon}>{translateString(TranslatableString.AddItemButton)}</Button>;
}
