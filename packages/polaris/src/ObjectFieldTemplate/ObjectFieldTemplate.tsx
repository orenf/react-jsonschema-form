import { Page, Grid, AppProvider } from '@shopify/polaris';

import {
  canExpand,
  descriptionId,
  FormContextType,
  getTemplate,
  getUiOptions,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  titleId,
} from '@rjsf/utils';

export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({
  description,
  title,
  properties,
  required,
  uiSchema,
  idSchema,
  schema,
  formData,
  onAddClick,
  disabled,
  readonly,
  registry,
}: ObjectFieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<'TitleFieldTemplate', T, S, F>('TitleFieldTemplate', registry, uiOptions);
  const DescriptionFieldTemplate = getTemplate<'DescriptionFieldTemplate', T, S, F>(
    'DescriptionFieldTemplate',
    registry,
    uiOptions
  );
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <>
      <AppProvider
        i18n={{
          Polaris: {},
        }}
      >
        <Page>
          {title && (
            <TitleFieldTemplate
              id={titleId<T>(idSchema)}
              title={title}
              required={required}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          )}
          {description && (
            <DescriptionFieldTemplate
              id={descriptionId<T>(idSchema)}
              description={description}
              schema={schema}
              uiSchema={uiSchema}
              registry={registry}
            />
          )}

          {properties.map((element: any, index: number) => (
            <Grid key={index}>
              <Grid.Cell columnSpan={{ xs: 6 }}>{element.content}</Grid.Cell>
            </Grid>
          ))}
          {canExpand(schema, uiSchema, formData) ? (
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6 }}>
                <AddButton
                  onClick={onAddClick(schema)}
                  disabled={disabled || readonly}
                  className='object-property-expand'
                  uiSchema={uiSchema}
                  registry={registry}
                />
              </Grid.Cell>
            </Grid>
          ) : null}
        </Page>
      </AppProvider>
    </>
  );
}
