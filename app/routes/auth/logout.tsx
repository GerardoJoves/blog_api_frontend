import { redirect } from 'react-router';

import { tokenCookie } from '~/cookies.server';

export async function loader() {
  const expiredCookie = await tokenCookie.serialize('', { maxAge: 0 });
  return redirect('/login', { headers: { 'Set-Cookie': expiredCookie } });
}
