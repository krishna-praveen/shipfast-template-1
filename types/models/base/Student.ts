export type Student = {
  id: string;
  name: string;
  surname: string;
  birthDate: string;
  gender: 'male' | 'female';
  state: string;
  city: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  userId: string;
}
