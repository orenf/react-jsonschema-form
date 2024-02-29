import { FocusEvent } from 'react';
import { ariaDescribedByIds, FormContextType, RJSFSchema, StrictRJSFSchema, WidgetProps } from '@rjsf/utils';
import { TextField, FormLayout, AppProvider } from '@shopify/polaris';

type CustomWidgetProps<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any> = WidgetProps<
  T,
  S,
  F
> & {
  options: any;
};

export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  id,
  placeholder,
  value,
  disabled,
  autofocus,
  readonly,
  onBlur,
  onFocus,
  onChange,
  options,
}: CustomWidgetProps<T, S, F>) {
  const _onChange = (value: string) => onChange(value === '' ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) => onBlur(id, value);
  const _onFocus = () => onFocus(id, value);

  return (
    <AppProvider
      i18n={{
        Polaris: {},
      }}
    >
      <FormLayout>
        <TextField
          id={id}
          name={id}
          label=''
          autoComplete='nope'
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          autoFocus={autofocus}
          multiline={options.rows || 5}
          onChange={_onChange}
          onBlur={_onBlur}
          onFocus={() => _onFocus()}
          aria-describedby={ariaDescribedByIds<T>(id)}
        />
      </FormLayout>
    </AppProvider>
  );
}
