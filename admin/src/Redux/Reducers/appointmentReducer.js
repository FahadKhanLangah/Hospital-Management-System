import { CLEAR_ERRORS, GET_ALL_APPOINTMENTS_FAIL, GET_ALL_APPOINTMENTS_REQUEST, GET_ALL_APPOINTMENTS_SUCCESS } from "../Constants/Admin.constants"



const appointmentState = {
  loading: false,
  appointments: [],
  error: null
}

export const appointmentReducer = (state = appointmentState, action) => {
  switch (action.type) {
    case GET_ALL_APPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        appointments: []
      }
    case GET_ALL_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload.appointments,
        error: null
      }
    case GET_ALL_APPOINTMENTS_FAIL:
      return {
        loading: false,
        appointments: [],
        error: action.payload
      }
      case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}