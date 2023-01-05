export function authHeader() {
  // return authorization header with jwt token
  // const token = JSON.parse(localStorage.getItem('authToken'));
  const token = localStorage.getItem('authToken');

  if (token) {
    return { 'Authorization': 'Bearer ' + token };
  } else {
    return {};
  }
}