import { createContext } from 'react';

type UsecContextType = {
  user?: { id: number; username: string; role: 'ADMIN' | 'USER' };
};

const UserContext = createContext<UsecContextType>({});

export default UserContext;
