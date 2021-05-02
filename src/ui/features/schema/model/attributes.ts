import { createStore } from 'effector';
import { keyBy } from 'lodash';
import type { Attribute } from '../../../../types/schema';

export const $attributes = createStore<Attribute[]>([]);

export const $attributesById = $attributes.map((attributes) =>
  keyBy(attributes, (attr) => attr.id)
);
