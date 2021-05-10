export enum AttributeType {
  Input = 'input',
  Select = 'select',
  MultiSelect = 'multiSelect',
}

export interface AttributeDefinition {
  id: string;
  name?: string;
  values?: string[];
  type?: AttributeType;
  otherValue?: boolean;
  multiSelect?: boolean;
}

export interface SchemaConfig {
  attributes: Record<string, Omit<AttributeDefinition, 'id'>>;
}
