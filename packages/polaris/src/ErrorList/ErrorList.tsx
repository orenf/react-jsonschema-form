import { Card, List, Text, BlockStack, InlineGrid } from '@shopify/polaris';

import { ErrorListProps, FormContextType, RJSFSchema, StrictRJSFSchema, TranslatableString } from '@rjsf/utils';

export default function ErrorList<T = any, S extends StrictRJSFSchema = RJSFSchema, F extends FormContextType = any>({
  errors,
  registry,
}: ErrorListProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Card>
      <BlockStack gap='200'>
        <InlineGrid columns='1fr auto'>
          <Text as='h2' variant='headingSm'>
            {translateString(TranslatableString.ErrorsLabel)}
          </Text>
        </InlineGrid>
        <List>
          {errors.map((error, i: number) => {
            return (
              <List.Item key={i}>
                <span>{error.stack}</span>
              </List.Item>
            );
          })}
        </List>
      </BlockStack>
    </Card>
  );
}
