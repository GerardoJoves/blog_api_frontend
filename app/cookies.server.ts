import { createCookie } from 'react-router';

export const tokenCookie = createCookie('bearer-token', { maxAge: 68_400 });
