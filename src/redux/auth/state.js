const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default initialState;