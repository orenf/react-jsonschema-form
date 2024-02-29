import { createSchemaUtils, englishStringTranslator, WidgetProps, RJSFSchema } from '@rjsf/utils';
import { getDefaultRegistry } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';

import Templates from '../../src/Templates';
import BaseInputTemplate from '../../src/BaseInputTemplate';

export const mockSchema: RJSFSchema = {
  type: 'array',
  items: {
    type: 'string',
  },
};

export const mockEventHandlers = (): void => void 0;

export const mockSchemaUtils = createSchemaUtils(validator, mockSchema);

export function mockRegistry() {
  return {
    fields: {},
    widgets: { TextWidget: BaseInputTemplate },
    templates: { ...getDefaultRegistry().templates, ...Templates },
    formContext: {},
    rootSchema: {},
    schemaUtils: mockSchemaUtils,
    translateString: englishStringTranslator,
  };
}

export function makeWidgetMockProps(props: Partial<WidgetProps> = {}): WidgetProps {
  return {
    id: '_id',
    name: '_name',
    placeholder: '',
    value: 'value',
    disabled: false,
    autofocus: true,
    readonly: true,
    uiSchema: {},
    schema: mockSchema,
    onChange: mockEventHandlers,
    onBlur: mockEventHandlers,
    onFocus: mockEventHandlers,
    label: 'Some simple label',
    rawErrors: [''],
    options: {},
    formContext: {},
    registry: mockRegistry(),
    ...props,
  };
}
