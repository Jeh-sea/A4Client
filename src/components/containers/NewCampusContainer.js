import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            address: "", 
            description: "",
            image_url: "", 
            redirect: false,
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        let campus = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            image_url: this.state.image_url || null
        };
    
        //adds new campus in back-end database
        let newCampus = await this.props.addCampus(campus); 

        // Update state, and trigger redirect to show the campuses list
        this.setState({
            name: "", 
            address: "", 
            description: "", 
            image_url: "",
            redirect: true, 
            // redirectId: newCampus.id // Uncomment if redirecting to the new campus page
        });
    }


    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    // Render new campus input form
    render() {
        // Redirect to campuses list after submit
        if(this.state.redirect) {
            // return (<Redirect to={`/campus/${this.state.redirectId}`}/>) // Redirect to new campus page
            return (<Redirect to={`/campuses`}/>) // Redirect to all campuses page
        }

        // Display the input form via the corresponding View component
        return (
        <div>
            <Header />
            <NewCampusView 
                handleChange = {this.handleChange} 
                handleSubmit={this.handleSubmit}      
            />
        </div>          
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

export default connect(null, mapDispatch)(NewCampusContainer);