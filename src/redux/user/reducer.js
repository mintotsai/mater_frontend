import { GET_USER_ACTION, UPDATE_USER_SUCCESS_ACTION, GET_QR_CODE_URI_SUCCESS_ACTION, GET_PRESIGNED_URL_SUCCESS_ACTION } from './actions'
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
    case GET_PRESIGNED_URL_SUCCESS_ACTION:
      return {
        ...state,
        blobSignedId: payload.blob_signed_id,
        directUploadUrl: payload.direct_upload.url,
        directUploadHeaders: payload.direct_upload.headers
      };
    default:
      return state
  }
}
export default userReducer