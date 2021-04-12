export interface User {
  id: number;
  name: string;
  role: 'supervisor' | 'manager' | 'director';
}

export const userIpc = 'listUsers';
