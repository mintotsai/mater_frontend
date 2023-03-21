// > localStorage.clear()
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = user
  ? { isLoggedIn: true, showOTPScreen: false, showResetPasswordScreen: false, resetToken: null, user: user, trueUser: null }
  : { isLoggedIn: false, showOTPScreen: false, showResetPasswordScreen: false, resetToken: null, user: null, trueUser: null };

export default initialState;