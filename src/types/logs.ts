export interface Log {
  orderId: number;
  attributeId: string;
  updatedAt: Date;
  updatedBy: string;
  fromValue: any;
  toValue: any;
}

export const ipcListLogs = 'listLogs';
