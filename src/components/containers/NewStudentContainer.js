/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      image_url: "",
      gpa: "",
      campusId: null, 
      redirect: false, 
      redirectId: null,
      errors: {},
      isFormValid: false
    };
  }

  validateField = (name, value) => {
    let error = null;
    switch (name) {
      case 'firstname':
      case 'lastname':
        if (!value) error = 'This field is required.';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = ' Email address is invalid.';
        }
        break;
      case 'gpa':
        const gpaValue = parseFloat(value);
        if (value === "" || value === null) {
            error = 'GPA is required.';
        } else if (isNaN(gpaValue)) {
            error = 'GPA must be a number.';
        } else if (gpaValue < 0.0 || gpaValue > 4.0) {
            error = 'GPA must be between 0.0 and 4.0.';
        }
        break;
      default:
        break;
    }
    return error;
  }

  checkFormValidity = (errors) => {
    return !errors.firstname && !errors.lastname && !errors.email && !errors.gpa;
  }

  handleChange = event => {
    const { name, value } = event.target;
    const error = this.validateField(name, value);
    const newErrors = { ...this.state.errors, [name]: error };

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: newErrors,
      isFormValid: this.checkFormValidity(newErrors)
    }));
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if (!this.state.isFormValid) {
      console.log("Form is not valid. Cannot submit.");
      return;
    }

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      image_url: this.state.image_url,
      gpa: parseFloat(this.state.gpa),
      campusId: this.state.campusId ? parseInt(this.state.campusId) : null
    };
    
    try {
      let newStudent = await this.props.addStudent(student);

      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        image_url: "",
        gpa: "",
        campusId: null,
        redirect: true,
        redirectId: newStudent.id,
        errors: {},
        isFormValid: false
      });
    } catch (error) {
      console.error("Error adding student:", error);
    }
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}  
          errors={this.state.errors}
          isFormValid={this.state.isFormValid}    
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);