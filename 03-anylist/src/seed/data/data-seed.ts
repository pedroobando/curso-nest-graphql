import { IUserSeed } from '../interfaces/user-seed.interface';

export const userSeed: IUserSeed[] = [
  {
    email: 'pedro@hotmail.com',
    fullName: 'Pedro Obando Medina',
    password: '123456',
    roles: ['user', 'admin'],
  },
  {
    email: 'francisco@hotmail.com',
    fullName: 'francisco Medina',
    password: '123456',
    roles: ['user'],
  },
  {
    email: 'Alicia@hotmail.com',
    fullName: 'Alicia Medina de Peraza',
    password: '123456',
    roles: ['user'],
  },
  {
    email: 'pedrorafael@hotmail.com',
    fullName: 'Pedro Rafael Medina Millan',
    password: '123456',
    roles: ['superUser', 'user'],
  },
  {
    email: 'luisf@hotmail.com',
    fullName: 'Luis Felipe Medina Millan',
    password: '123456',
    roles: ['admin'],
  },
  {
    email: 'belkis@hotmail.com',
    fullName: 'Belkis Marin de Medina',
    password: '654321',
    roles: ['user'],
  },
];
