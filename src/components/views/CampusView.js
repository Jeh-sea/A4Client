/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, handleDelete } = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      {campus.image_url && (
        <img 
          src={campus.image_url} 
          alt="Campus" 
          style={{maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', marginBottom: '10px'}} 
        />
      )}
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/campus/${campus.id}/edit`}>
        <button>Edit Campus</button>
      </Link>
      <button onClick={() => handleDelete(campus.id)} style={{marginLeft: '10px'}}> 
        Delete Campus
      </button>
      <hr/>

      <h2>Students</h2>
      {campus.students.length === 0 ? (
        <p>There are no students enrolled in this campus.</p>
      ) : (
        campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>             
            </div>
          );
        })
      )}
    </div>
  );
};

CampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default CampusView;