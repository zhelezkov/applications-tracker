import { combine, createEffect, forward } from 'effector';
import { createGate } from 'effector-react';
import { loadSchema } from '../../../../types/schema';
import { $attributes, $attributesById } from './attributes';

export const schemaGate = createGate();

export const $schema = combine($attributes, $attributesById);

export const fetchSchemaFx = createEffect(async () => {
  return loadSchema();
});

forward({
  from: schemaGate.open,
  to: fetchSchemaFx,
});

forward({
  from: fetchSchemaFx.doneData.map((schema) =>
    Object.entries(schema.attributes).map(([name, attr]) => ({
      ...attr,
      id: name,
    }))
  ),
  to: $attributes,
});
