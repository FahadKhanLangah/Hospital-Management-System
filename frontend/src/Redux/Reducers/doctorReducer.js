import { GET_ALL_DOCTORS_FAIL, GET_ALL_DOCTORS_REQUEST, GET_ALL_DOCTORS_SUCCESS } from "../Constants/adminConstants";

const initialState = {
  loading: false,
  doctors: JSON.parse(localStorage.getItem("alldoctors")) || [],
  error: null
}

export const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOCTORS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_ALL_DOCTORS_SUCCESS:
      localStorage.setItem("alldoctors", JSON.stringify(action.payload.allDoctors));
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
    default:
      return state;
  }
}