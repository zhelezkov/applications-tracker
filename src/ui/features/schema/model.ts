import { combine, createEffect, createStore, forward } from 'effector';
import { createGate } from 'effector-react';
import { keyBy } from 'lodash';
import type { AttributeDefinition, SchemaConfig } from '../../../types/schema';
import ipc from '../../ipc';

export const $attributes = createStore<AttributeDefinition[]>([]);

export const $attributesById = $attributes.map((attributes) =>
  keyBy(attributes, (attr) => attr.id)
);

export const $schema = combine({ $attributes, $attributesById });

export const fetchSchemaFx = createEffect<void, SchemaConfig>(async () =>
  ipc().invoke('loadSchema')
);

export const schemaGate = createGate();

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
