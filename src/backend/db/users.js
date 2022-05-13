import { formatDate } from '../utils/authUtils';
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: 0,
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU',
    username: '@guest',
    location: 'GuestRoom',
    desc: 'Aspiring to be a very well behaving and well mannered guest.',
    dob: '29/02/2000',
    name: 'guest',
    password: 'guest777',
    email: 'guest@gmail.com',
    createdAt: '12/05/2022',
    updatedAt: formatDate(),
    about: `When the life was very simple the needs of people were limited. The cost of living was not very much high.

    The things were available in the markets at the cheap rates, and they were in the limits of common people. The guests and visitors were welcomed in the past.
    
    As ours is a country where it was taught from the very beginning that a visitor is like a God. But as the life today has become very costly, any type of guest is not welcomed now.
    But some uninvited and unexpected guestdrops in and makes the life of the host miserable.`,
  },
];
