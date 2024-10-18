import { ADD_DOCTORS_FAIL, ADD_DOCTORS_REQUEST, ADD_DOCTORS_SUCCESS, GET_ALL_DOCTORS_FAIL, GET_ALL_DOCTORS_REQUEST, GET_ALL_DOCTORS_SUCCESS, GET_ALL_PATIENTS_FAIL, GET_ALL_PATIENTS_REQUEST, GET_ALL_PATIENTS_SUCCESS, LOGIN_ADMIN_FAIL, LOGIN_ADMIN_REQUEST, LOGIN_ADMIN_SUCCESS, LOGOUT_ADMIN_FAIL, LOGOUT_ADMIN_REQUEST, LOGOUT_ADMIN_SUCCESS } from "../Constants/Admin.constants";

const initialState = {
  loading: false,
  isAuth: false,
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  error: null
}
export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_REQUEST:
    case LOGOUT_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case LOGIN_ADMIN_SUCCESS:
      localStorage.setItem("admin", JSON.stringify(action.payload.admin));
      return {
        ...state,
        loading: false,
        isAuth: action.payload.success,
        message: action.payload.message,
        admin: action.payload.admin,
        error: null
      }
    case LOGOUT_ADMIN_SUCCESS:
      localStorage.removeItem("admin");
      return {
        ...state,
        loading: false,
        isAuth: false,
        message: action.payload.message,
        admin: null,
        error: null
      }
    case LOGIN_ADMIN_FAIL:
    case LOGOUT_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}

const doctorState = {
  loading: false,
  doctors: [],
  error: null
}
export const doctorReducer = (state = doctorState, action) => {
  switch (action.type) {
    case GET_ALL_DOCTORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        doctors: action.payload.allDoctors,
        error: null
      }
    case GET_ALL_DOCTORS_FAIL:
      return {
        loading: false,
        doctors: [],
        error: action.payload
      }
    // Add Doctor Reducer
    case ADD_DOCTORS_REQUEST:
      return {
        ...state,
        loading: true,
        addDoctorSuccess: false,
        error: null,
      };
    case ADD_DOCTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        addDoctorSuccess: true,
        error: null,
        message: action.payload.message
      };
    case ADD_DOCTORS_FAIL:
      return {
        ...state,
        loading: false,
        addDoctorSuccess: false,
        error: action.payload
      };
    default:
      return state;
  }
}
const patientState = {
  loading: false,
  patients: [],
  error: null
}

export const patientReducer = (state = patientState, action) => {
  switch (action.type) {
    case GET_ALL_PATIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_ALL_PATIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        patients: action.payload.users,
        error: null
      }
    case GET_ALL_PATIENTS_FAIL:
      return {
        loading: false,
        patients: [],
        error: action.payload
      }
    default:
      return state;
  }
}