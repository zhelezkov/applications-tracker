export interface User {
  id: number;
  name: string;
  password: string;
  role: 'supervisor' | 'manager' | 'director';
}

export const ipcListUsers = 'listUsers';
