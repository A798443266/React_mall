import request from '../utils/request'

export async function login(data) {
  const result = await request('/login', {
    method: 'POST',
    body: data,
  });
  return result;
}