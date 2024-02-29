import { FormLayout, RadioButton } from '@shopify/polaris';

import {
  ariaDescribedByIds,
  enumOptionsIsSelected,
  enumOptionsValueForIndex,
  optionId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

export default function RadioWidget<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  id,
  options,
  value,
  disabled,
  readonly,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;

  return (
    <FormLayout>
      <FormLayout.Group>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const itemDisabled = Array.isArray(enumDisabled) && enumDisabled.indexOf(option.value) !== -1;
            const checked = enumOptionsIsSelected<S>(option.value, value);

            const radio = (
              <RadioButton
                label={option.label}
                id={optionId(id, index)}
                key={index}
                name={id}
                disabled={disabled || itemDisabled || readonly}
                checked={checked}
                value={String(index)}
                onChange={() => onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))}
                onBlur={() => onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))}
                onFocus={() => onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue))}
                ariaDescribedBy={ariaDescribedByIds<T>(id)}
              />
            );
            return radio;
          })}
      </FormLayout.Group>
    </FormLayout>
  );
}
