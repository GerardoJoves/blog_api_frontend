import { createContext } from 'react';

import { type User } from '~/types/User';

const UserContext = createContext<User | null>(null);

export default UserContext;
