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
      isFormValid: false,
      touched: { 
        firstname: false,
        lastname: false,
        email: false,
        gpa: false,
        campusId: false
      }
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
        if (value !== "" && value != null) {
          const gpaValue = parseFloat(value);
          error = 'GPA is required.';
          if (isNaN(gpaValue)) {
            error = 'GPA must be a number.';
          } else if (gpaValue < 0.0 || gpaValue > 4.0) {
            error = 'GPA must be between 0.0 and 4.0.';
          }
        }
        break;
      default:
        break;
    }
    return error;
  }

  checkFormValidity = (errors, state) => {
    return !!state.firstname && !!state.lastname && !!state.email && !errors.firstname && !errors.lastname && !errors.email && !errors.gpa;
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState(prevState => {
      const newState = { ...prevState, [name]: value };
      let newErrors = { ...prevState.errors};
      let formIsValid = prevState.isFormValid;
      
      if (name !== 'email' && prevState.touched[name]) {
        const error = this.validateField(name, value);
        newErrors = { ...newErrors, [name]: error };
        formIsValid = this.checkFormValidity(newErrors, newState);
      } else if (name === 'email') {
         newErrors = { ...newErrors, email: null }; 
         formIsValid = this.checkFormValidity(newErrors, newState);
      } else {
         formIsValid = this.checkFormValidity(newErrors, newState);
      }

      return {
        ...newState,
        errors: newErrors,
        isFormValid: formIsValid
      };
    });
  }

  handleBlur = event => {
    const { name, value } = event.target;
    
    this.setState(prevState => ({
      touched: { ...prevState.touched, [name]: true }
    }));

    const error = this.validateField(name, value);
    this.setState(prevState => {
      const newErrors = { ...prevState.errors, [name]: error };
      const formIsValid = this.checkFormValidity(newErrors, prevState);
        return {
          errors: newErrors,
          isFormValid: formIsValid
        };
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    this.setState(prevState => ({
      touched: {
        firstname: true,
        lastname: true,
        email: true,
        gpa: true,
        campusId: true
      }
    })); 

    let finalErrors = {};
    let canSubmit = true;
    Object.keys(this.state.touched).forEach(name => {
        const error = this.validateField(name, this.state[name]);
        if (error) {
            finalErrors[name] = error;
            if (name === 'firstname' || name === 'lastname' || name === 'email') {
               canSubmit = false; 
            }
            if (name === 'gpa' && error) {
                canSubmit = false;
            }
        }
    });

    this.setState({ errors: finalErrors });

    if (!canSubmit) {
      console.log("Form has validation errors. Cannot submit.");
      this.setState({ isFormValid: false });
      return;
    }

    this.setState({ isFormValid: true }); 

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      image_url: this.state.image_url,
      gpa: this.state.gpa !== "" ? parseFloat(this.state.gpa) : null, 
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
        isFormValid: false,
        touched: { 
          firstname: false, 
          lastname: false, 
          email: false, 
          gpa: false, 
          campusId: false 
        }
      });
    } catch (error) {
      console.error("Error adding student:", error);
      let specificErrorHandled = false;
      if (error.response && error.response.status === 409) { 
        this.setState(prevState => ({
          errors: { ...prevState.errors, email: "This Email has already been registered." },
          isFormValid: false
        }));
        specificErrorHandled = true;
      } else if (error.response && error.response.status === 400) { 
          if (error.response.data && error.response.data.message && /campus/i.test(error.response.data.message)) { 
            this.setState(prevState => ({
              errors: { ...prevState.errors, campusId: "Campus ID is invalid." },
              isFormValid: false
            }));
            specificErrorHandled = true;
          }
        }
        if (!specificErrorHandled) {
          this.setState(prevState => ({
          errors: { ...prevState.errors, form: "An unexpected error occurred. Please try again." },
          isFormValid: false
        }));
      }
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
          handleBlur={this.handleBlur}
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