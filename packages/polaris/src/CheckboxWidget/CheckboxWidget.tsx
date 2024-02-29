import {
  ariaDescribedByIds,
  descriptionId,
  getTemplate,
  labelValue,
  WidgetProps,
  StrictRJSFSchema,
  RJSFSchema,
  FormContextType,
} from '@rjsf/utils';
import { FormLayout, Checkbox } from '@shopify/polaris';

export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    value,
    disabled,
    readonly,
    label,
    hideLabel,
    schema,
    options,
    onChange,
    onBlur,
    onFocus,
    registry,
    uiSchema,
  } = props;
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  //const required = schemaRequiresTrueValue<S>(schema);
  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    options
  );

  //const _onChange = useCallback((newChecked: boolean) => onChange(newChecked), [onChange]);
  //const _onBlur = useCallback((newChecked: boolean) => onBlur(newChecked), [onBlur]);
  //const _onFocus = (checked: boolean) => onFocus(id, checked);

  const description = options.description || schema.description;
  return (
    <FormLayout>
      <FormLayout.Group aria-describedby={ariaDescribedByIds<T>(id)}>
        {!hideLabel && !!description && (
          <DescriptionFieldTemplate
            id={descriptionId<T>(id)}
            description={description}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          />
        )}
        <Checkbox
          id={id}
          name={id}
          label={labelValue(label, hideLabel || !label)}
          checked={typeof value === 'undefined' ? false : value}
          disabled={disabled || readonly}
          onChange={() => onChange(typeof value === 'undefined' ? false : value)}
          onBlur={() => onBlur(id, typeof value === 'undefined' ? false : value)}
          onFocus={() => onFocus(id, typeof value === 'undefined' ? false : value)}
        />
      </FormLayout.Group>
    </FormLayout>
  );
}
