import { FocusEvent } from 'react';
import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';

import { FormLayout, TextField, Grid } from '@shopify/polaris';

export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  classNames,
  style,
  children,
  disabled,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  readonly,
  schema,
  uiSchema,
  registry,
}: WrapIfAdditionalTemplateProps<T, S, F>) {
  const { templates, translateString } = registry;
  // Button templates are not overridden in the uiSchema
  const { RemoveButton } = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  const handleBlur = ({ target }: FocusEvent<HTMLInputElement>) => onKeyChange(target.value);
  const keyId = `${id}-key`;

  return (
    <Grid key={keyId}>
      <Grid.Cell columnSpan={{ xs: 5 }}>
        <FormLayout>
          <FormLayout.Group>
            <TextField
              disabled={disabled || readonly}
              autoComplete='nope'
              id={keyId}
              name={keyId}
              label={keyLabel}
              onChange={() => console.log('changing')}
              onBlur={!readonly ? handleBlur : undefined}
              type='text'
            />
          </FormLayout.Group>
        </FormLayout>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 5 }}>{children}</Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 2 }}>
        <RemoveButton
          className='w-100'
          disabled={disabled || readonly}
          onClick={onDropPropertyClick(label)}
          uiSchema={uiSchema}
          registry={registry}
        />
      </Grid.Cell>
    </Grid>
  );
}
