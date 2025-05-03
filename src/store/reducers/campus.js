/*==================================================
/src/store/reducers/campus.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object. 
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */
import { FETCH_CAMPUS , EDIT_CAMPUS, EDIT_STUDENT} from "../actions/actionTypes";  // Import Action Type

// Define default Initial State
const initialState = {
  students: [],  // Empty students array
};

// REDUCER:
const campus = (state = initialState, action) => {  // Use "initialState" as default Initial State
  switch (action.type) {
    case FETCH_CAMPUS:
      return { ...action.payload, students: action.payload.students || [] };
    case EDIT_CAMPUS:
      if (state.id === action.payload.id) {
        return { ...state, ...action.payload };
      } else {
        return state;
      }
      case EDIT_STUDENT:
      const updatedStudent = action.payload;
      let newStudents = [...state.students];

      if (updatedStudent.campusId === state.id) {
        if (!newStudents.some(s => s.id === updatedStudent.id)) {
          newStudents.push(updatedStudent);
        }
      }
      else {
        newStudents = newStudents.filter(s => s.id !== updatedStudent.id);
      }
      if (newStudents.length !== state.students.length || !newStudents.every((s, i) => s.id === state.students[i]?.id)) {
         return { ...state, students: newStudents };
      } else {
         return state;
      }
    default:
      return state;
  }
};

export default campus;