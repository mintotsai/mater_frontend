import { GET_USER_ACTION, UPDATE_USER_SUCCESS_ACTION, GET_QR_CODE_URI_SUCCESS_ACTION } from './actions'
import initialState from './state'

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_ACTION:
      return {}
    case GET_QR_CODE_URI_SUCCESS_ACTION:
      return {
        ...state,
        qrCodeUri: payload.qr,
        qrSecret: payload.qr_secret
      };
    default:
      return state
  }
}
export default userReducer