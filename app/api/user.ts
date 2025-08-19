const API_HOST = import.meta.env.VITE_APP_API_URL;

type UserCredentials = {
  username: string;
  password: string;
};

export async function createUser(userCredentials: UserCredentials) {
  const res = await fetch(API_HOST + '/users/register', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userCredentials),
  });
  const data = await res.json();
  return data;
}

export async function login(userCredentials: UserCredentials) {
  const res = await fetch(API_HOST + '/users/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userCredentials),
  });
  const data = await res.json();
  return data;
}
