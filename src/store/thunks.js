/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from './actions/actionCreators';  // Import Action Creators ("ac" keyword Action Creator)
const axios = require('axios');


const DEFAULT_CAMPUS_IMAGE_URL = 'https://www.travelandleisure.com/thmb/4i9gLewM45kVsDGloXO5Z9wKlfk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/notre-dame-university-COLLEGECAMP0421-039ce0bfd40b4e429b825c6fb6ebfaa6.jpg';
const DEFAULT_STUDENT_IMAGE_URL = 'https://static.vecteezy.com/system/resources/thumbnails/026/911/382/small_2x/happy-student-boy-with-books-isolated-free-photo.jpg';

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);  
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllCampuses(res.data));
  } catch(err) {
    console.error(err);
  }
};

export const addCampusThunk = (campus) => async (dispatch) => {
  try {
    const campusToSend = {
      name: campus.name,
      address: campus.address,
      description: campus.description,
      image_url: campus.image_url || DEFAULT_CAMPUS_IMAGE_URL, 
    };
    let res = await axios.post(`/api/campuses`, campusToSend);
    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch(err) {
    console.error(err);
  }
};

export const deleteCampusThunk = campusId => async dispatch => {
  try {

    await axios.delete(`/api/campuses/${campusId}`);

    dispatch(ac.deleteCampus(campusId));
  } catch(err) {
    console.error(err);
  }
};

export const editCampusThunk = campus => async dispatch => {
  try {
    const campusToSend = {
      name: campus.name,
      address: campus.address,
      description: campus.description,
      image_url: campus.image_url
    };
    let updatedCampus = await axios.put(`/api/campuses/${campus.id}`, campusToSend); 

    dispatch(ac.editCampus(updatedCampus.data));
    return updatedCampus.data;
  } catch(err) {
    console.error(err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get a student data (based on "id")from database
    let res = await axios.get(`/api/campuses/${id}`);  
    dispatch(ac.fetchCampus(res.data));
  } catch(err) {
    console.error(err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);  
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.fetchAllStudents(res.data));  
  } catch(err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {  // The THUNK
  try {
    const studentToSend = {
      firstname: student.firstname,
      lastname: student.lastname,
      email: student.email,
      gpa: student.gpa,
      campusId: student.campusId,
      image_url: student.image_url || DEFAULT_STUDENT_IMAGE_URL,
    };
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, studentToSend);  
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state 
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch(err) {
    console.error(err);
    throw err;
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = studentId => async dispatch => {  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`/api/students/${studentId}`);  
    // Delete successful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch(err) {
    console.error(err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = student => async dispatch => {  // The THUNK
  try {
    // API "put" call to update student (based on "id" and "student" object's data) from database
    let updatedStudent = await axios.put(`/api/students/${student.id}`, student); 
    // Update successful so change state with dispatch
    dispatch(ac.editStudent(updatedStudent.data));
  } catch(err) {
    console.error(err);
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = id => async dispatch => {  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);  
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data 
    dispatch(ac.fetchStudent(res.data));
  } catch(err) {
    console.error(err);
  }
};
