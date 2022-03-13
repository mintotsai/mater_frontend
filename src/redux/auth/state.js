const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = user
  ? { isLoggedIn: true, showOTPScreen: false, user }
  : { isLoggedIn: false, showOTPScreen: false, user: null };

export default initialState;