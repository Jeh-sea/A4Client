import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            address: "", 
            description: "",
            image_url: "", 
            redirect: false, 
            redirectId: null,
            id: null
        };
    }

    componentDidMount() {
        const campusId = this.props.match.params.id;
        this.props.fetchCampus(campusId)
            .then(() => {
                this.setState({
                    id: this.props.campus.id,
                    name: this.props.campus.name || "",
                    address: this.props.campus.address || "",
                    description: this.props.campus.description || "",
                    image_url: this.props.campus.image_url || "",
                });
            });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.campus !== this.props.campus) {
        this.setState({
            id: this.props.campus.id,
            name: this.props.campus.name || "",
            address: this.props.campus.address || "",
            description: this.props.campus.description || "",
            image_url: this.props.campus.image_url || "",
        });
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let campus = {
            id: this.state.id, 
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            image_url: this.state.image_url || null 
        };
        
        await this.props.editCampus(campus); 

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
            return (<Redirect to={`/campus/${this.state.redirectId}`}/>) 
        }

        return (
            <div>
                <Header />
                {this.state.id ? (
                <EditCampusView 
                    handleChange = {this.handleChange} 
                    handleSubmit={this.handleSubmit}   
                    campus={this.state}
                />
                ) : (
                <p>Loading campus data...</p>
                )}
            </div>          
        );
    }
}


const mapState = (state) => {
    return {
        campus: state.campus,
    };
};


const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

EditCampusContainer.propTypes = {
    fetchCampus: PropTypes.func.isRequired,
    editCampus: PropTypes.func.isRequired,
    campus: PropTypes.object.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    }).isRequired,
};

export default connect(mapState, mapDispatch)(EditCampusContainer);