import { createStore } from 'effector';
import { keyBy } from 'lodash';
import type { AttributeDefinition } from '../../../../types/schema';

export const $attributes = createStore<AttributeDefinition[]>([]);

export const $attributesById = $attributes.map((attributes) =>
  keyBy(attributes, (attr) => attr.id)
);
