/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk , deleteCampusThunk, fetchAllStudentsThunk, editStudentThunk} from "../../store/thunks";
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CampusView } from "../views";

class CampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }
  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
    this.props.fetchAllStudents();
  }

  handleDelete = async (campusId) => {
    await this.props.deleteCampus(campusId);
    this.setState({ redirect: true }); 
  };

  handleEnroll = async (studentId) => {
    const studentToUpdate = this.props.allStudents.find(s => s.id === studentId);
    if (studentToUpdate) {
      const updatedStudent = { ...studentToUpdate, campusId: this.props.campus.id };
      await this.props.editStudent(updatedStudent);
      this.props.fetchCampus(this.props.campus.id);
    }
  };

  handleUnenroll = async (studentId) => {
    const studentToUpdate = this.props.campus.students.find(s => s.id === studentId);
    if (studentToUpdate) {
      const updatedStudent = { ...studentToUpdate, campusId: null };
      delete updatedStudent.campus;
      await this.props.editStudent(updatedStudent);
      this.props.fetchCampus(this.props.campus.id);
    }
  };

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    if (this.state.redirect) {
      return <Redirect to="/campuses" />;
    }
    const unassignedStudents = this.props.allStudents.filter(student => student.campusId === null);
    return (
      <div>
        <Header />
        <CampusView 
        campus={this.props.campus}
        handleDelete={this.handleDelete}
        unassignedStudents={unassignedStudents}
        handleEnroll={this.handleEnroll}
        handleUnenroll={this.handleUnenroll}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
    allStudents: state.allStudents,
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (campusId) => dispatch(deleteCampusThunk(campusId)),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

CampusContainer.propTypes = {
  campus: PropTypes.object.isRequired,
  fetchCampus: PropTypes.func.isRequired,
  deleteCampus: PropTypes.func.isRequired,
  allStudents: PropTypes.array.isRequired,
  fetchAllStudents: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);