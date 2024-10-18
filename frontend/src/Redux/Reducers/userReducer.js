import { CLEAR_ERRORS, GET_LOGIN_USER_DETAIL_FAIL, GET_LOGIN_USER_DETAIL_REQUEST, GET_LOGIN_USER_DETAIL_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "../Constants/userConstant";

const initialState = {
  loading: false,
  error: null,
  user: {},
  atoken: null,
  loginSuccess: false
}
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case LOGOUT_USER_REQUEST:
    case GET_LOGIN_USER_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        atoken: action.payload.token,
        loginSuccess: action.payload.success,
        user: action.payload.user,
      }
    case GET_LOGIN_USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null,
      }
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        atoken: null,
        loginSuccess: false,
        logoutSuccess: action.payload.success,
        message: action.payload.message
      }
    case LOGIN_USER_FAIL:
    case GET_LOGIN_USER_DETAIL_FAIL:
      return {
        ...state,
        user: {},
        loading: false,
        error: action.payload
      }
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      }
    default:
      return state;
  }
}

const updateState = {
  loading: false,
  error: null,
  success: false
}
export const updateUserReducer = (state = updateState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false
      };
    case UPDATE_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        success: action.payload.success
      };
    case UPDATE_USER_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state
  }
}