import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import EditStudentView from '../views/EditStudentView';
// Import necessary thunks
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            firstname: "", 
            lastname: "", 
            email: "",
            image_url: "",
            gpa: "",
            campusId: null, 
            redirect: false, 
            redirectId: null,
        };
    }

    componentDidMount() {
        const studentId = this.props.match.params.id;
        this.props.fetchStudent(studentId)
            .then(() => {
                this.setState({
                    id: this.props.student.id,
                    firstname: this.props.student.firstname || "",
                    lastname: this.props.student.lastname || "",
                    email: this.props.student.email || "",
                    image_url: this.props.student.image_url || "",
                    gpa: this.props.student.gpa != null ? parseFloat(this.props.student.gpa) : "", 
                    campusId: this.props.student.campusId, 
                });
            })
            .catch(error => {
                console.error("Error fetching student:", error);
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.student !== this.props.student && this.props.student) {
            this.setState({
                id: this.props.student.id,
                firstname: this.props.student.firstname || "",
                lastname: this.props.student.lastname || "",
                email: this.props.student.email || "",
                image_url: this.props.student.image_url || "",
                gpa: this.props.student.gpa != null ? parseFloat(this.props.student.gpa) : "",
                campusId: this.props.student.campusId,
            });
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        let student = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            image_url: this.state.image_url,
            gpa: this.state.gpa !== "" ? parseFloat(this.state.gpa) : null, 
            campusId: this.state.campusId ? parseInt(this.state.campusId) : null 
        };
        
        await this.props.editStudent(student); 

        this.setState({
            redirect: true, 
            redirectId: this.state.id
        });
    } 

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={`/student/${this.state.redirectId}`}/>) 
        }

        return (
            <div>
                <Header />
                <EditStudentView 
                    student={this.state}
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}   
                />
            </div>          
        );
    }
}

const mapState = (state) => {
    return {
        student: state.student, 
    };
};

const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

EditStudentContainer.propTypes = {
    fetchStudent: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default connect(mapState, mapDispatch)(EditStudentContainer);