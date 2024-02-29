import { ChangeEvent, FocusEvent } from 'react';
import { Select } from '@shopify/polaris';
import {
  ariaDescribedByIds,
  FormContextType,
  enumOptionsValueForIndex,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, options, disabled, readonly, multiple, onChange, onBlur, onFocus }: WidgetProps<T, S, F>) {
  const { enumOptions, emptyValue: optEmptyValue } = options;

  function getValue(event: FocusEvent | ChangeEvent | any, multiple?: boolean) {
    if (multiple) {
      return [].slice
        .call(event.target.options as any)
        .filter((o: any) => o.selected)
        .map((o: any) => o.value);
    } else {
      return event.target.value;
    }
  }

  function getOptions() {
    const options = [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'lastWeek' },
    ];
    return options;
    /**
    {!multiple && schema.default === undefined && <option value=''>{placeholder}</option>}
    {(enumOptions as any).map(({ value, label }: any, i: number) => {
      const disabled: any = Array.isArray(enumDisabled) && (enumDisabled as any).indexOf(value) != -1;
      return (
        <option key={i} id={label} label={label} value={String(i)} disabled={disabled} />
    })}
     */
  }

  return (
    <Select
      id={id}
      name={id}
      label='test'
      options={getOptions()}
      disabled={disabled || readonly}
      onBlur={
        onBlur &&
        ((event: React.FocusEvent<HTMLSelectElement>) => {
          const newValue = getValue(event, multiple);
          onBlur(id, enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue));
        })
      }
      onFocus={
        onFocus &&
        ((event: React.FocusEvent<HTMLSelectElement>) => {
          const newValue = getValue(event, multiple);
          onFocus(id, enumOptionsValueForIndex<S>(newValue, enumOptions, optEmptyValue));
        })
      }
      onChange={(selected: string) => {
        onChange(enumOptionsValueForIndex<S>(selected, enumOptions, optEmptyValue));
      }}
      aria-describedby={ariaDescribedByIds<T>(id)}
    />
  );
}
