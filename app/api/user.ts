const API_HOST = import.meta.env.VITE_APP_API_URL;

export async function createUser(values: {
  username: string;
  password: string;
}) {
  const res = await fetch(API_HOST + '/users/register', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const data = await res.json();
  return data;
}
