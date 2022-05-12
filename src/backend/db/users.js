import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 0,
    name: 'guest',
    password: 'guest777',
    email: 'guest@gmail.com',
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
