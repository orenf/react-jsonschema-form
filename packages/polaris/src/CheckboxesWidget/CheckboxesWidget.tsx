import { ChangeEvent } from 'react';
import { FormLayout, Checkbox } from '@shopify/polaris';
import {
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  enumOptionsValueForIndex,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, disabled, options, value, readonly, onChange, onBlur, onFocus }: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;
  const checkboxesValues = Array.isArray(value) ? value : [value];

  const _onChange =
    (index: number) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        onChange(enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions));
      } else {
        onChange(enumOptionsDeselectValue<S>(index, checkboxesValues, enumOptions));
      }
    };

  return (
    <FormLayout>
      <FormLayout.Group>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index: number) => {
            const checked = enumOptionsIsSelected<S>(option.value, checkboxesValues);
            const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;

            return (
              <Checkbox
                key={option.value}
                checked={checked}
                id={optionId(id, index)}
                name={id}
                label={option.label}
                onChange={() => _onChange(index)}
                onBlur={() => onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))}
                onFocus={() => onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))}
                disabled={disabled || itemDisabled || readonly}
                ariaDescribedBy={ariaDescribedByIds<T>(id)}
              />
            );
          })}
      </FormLayout.Group>
    </FormLayout>
  );
}
