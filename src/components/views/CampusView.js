/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const styles = {
  studentRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  sectionTitle: {
    marginTop: '20px',
    borderTop: '1px solid #ccc',
    paddingTop: '15px',
  }
};

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, handleDelete, unassignedStudents, handleEnroll, handleUnenroll } = props;
  
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
      <p><strong>Address:</strong> {campus.address}</p>
      <p><strong>Description:</strong> {campus.description}</p>

      <Link to={`/campus/${campus.id}/edit`}>
        <button style = {styles.button}>Edit Campus</button>
      </Link>
      <button onClick={() => handleDelete(campus.id)} style={styles.button}> 
        Delete Campus
      </button>
      <hr/>

      <h2 style={styles.sectionTitle}>Enrolled Students</h2>
      {campus.students && campus.students.length > 0 ? (
        campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} style={styles.studentRow}>
              <Link to={`/student/${student.id}`}>
                <span>{name}</span>
              </Link>
              <button onClick={() => handleUnenroll(student.id)} style={styles.button}>
                Unenroll
              </button>
            </div>
          );
        })
      ) : (
        <p>There are no students currently enrolled in this campus.</p>
      )}

      <h2 style={styles.sectionTitle}>Available Students to Enroll</h2>
      {unassignedStudents && unassignedStudents.length > 0 ? (
        unassignedStudents.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} style={styles.studentRow}>
              <Link to={`/student/${student.id}`}>
                <span>{name}</span>
              </Link>
              <button onClick={() => handleEnroll(student.id)} style={styles.button}>
                Enroll
              </button>
            </div>
          );
        })
      ) : (
        <p>There are no available students to enroll.</p>
      )}
    </div>
  );
};

CampusView.propTypes = {
  campus: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  unassignedStudents: PropTypes.array.isRequired,
  handleEnroll: PropTypes.func.isRequired,
  handleUnenroll: PropTypes.func.isRequired,
};
export default CampusView;