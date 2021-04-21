import { makeService } from '../db/utils';
import { loadRuntimeConfig } from './config';

const runtimeConfig = loadRuntimeConfig('./config/config.yaml');

export const configService = makeService({
  loadSchema: () => {
    return runtimeConfig.schema;
  },
});
