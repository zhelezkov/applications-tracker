export interface Log {
  orderId: number;
  attributeId: string;
  isActual: boolean;
  updatedAt: Date;
  updatedBy: string;
  fromValue: any;
  toValue: any;
}

export const ipcListLogs = 'listLogs';
