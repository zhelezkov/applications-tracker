import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Attribute, Schema } from '../../../types/schema';
import { keyBy } from 'lodash';

interface SchemaState {
  attributes: Attribute[];
  attributesById: Record<string, Attribute>;
}

const initialState: SchemaState = {
  attributes: [],
  attributesById: {},
};

export const schemaSlice = createSlice({
  name: 'schema',
  initialState,
  reducers: {
    setSchema: (state, { payload: schema }: PayloadAction<Schema>) => {
      const mapped = Object.entries(schema.attributes).map(([name, attr]) => ({
        ...attr,
        id: name,
      }));
      state.attributes = mapped;
      state.attributesById = keyBy(mapped, (attr) => attr.id);
    },
  },
});

export const { setSchema } = schemaSlice.actions;

export const selectSchema = (state: RootState) => state.auth;

export default schemaSlice.reducer;
