export interface User {
  id: number;
  name: string;
  role: 'supervisor' | 'manager' | 'director';
}
