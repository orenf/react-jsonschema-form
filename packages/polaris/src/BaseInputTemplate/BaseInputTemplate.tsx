import { FocusEvent } from 'react';
import { TextField } from '@shopify/polaris';
import {
  ariaDescribedByIds,
  BaseInputTemplateProps,
  examplesId,
  labelValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  getUiOptions,
} from '@rjsf/utils';

/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: BaseInputTemplateProps<T, S, F>) {
  const {
    id,
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    hideLabel,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
    rawErrors = [],
  } = props;
  const uiOptions = getUiOptions(uiSchema);

  const _onChange = (value: string) => onChange(value === '' ? options.emptyValue : value);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLTextAreaElement>) => onBlur(id, value);
  const _onFocus = () => onFocus(id, value);

  return (
    <>
      <TextField
        id={id}
        name={id}
        placeholder={placeholder}
        label={labelValue(label || undefined, hideLabel, undefined)}
        autoFocus={autofocus}
        requiredIndicator={required}
        disabled={disabled || readonly}
        type={type}
        value={value || value === 0 ? value : ''}
        error={rawErrors.length > 0 ? rawErrors : ''}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        helpText={uiOptions.help}
        autoComplete='off'
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
      />
      {Array.isArray(schema.examples) && (
        <datalist id={examplesId<T>(id)}>
          {(schema.examples as string[])
            .concat(schema.default && !schema.examples.includes(schema.default) ? ([schema.default] as string[]) : [])
            .map((example: any) => {
              return <option key={example} value={example} />;
            })}
        </datalist>
      )}
    </>
  );
}
