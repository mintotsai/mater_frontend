const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = user
  ? { isLoggedIn: true, showOTPScreen: false, showResetPasswordScreen: false, resetToken: null, user }
  : { isLoggedIn: false, showOTPScreen: false, showResetPasswordScreen: false, resetToken: null, user: null };

export default initialState;