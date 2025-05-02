/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student, deleteStudent } = props;
  const formattedGPA = student.gpa != null ? parseFloat(student.gpa).toFixed(2) : "N/A";

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      {student.campus ? (
        <h3>
          <Link to={`/campus/${student.campus.id}`}>
            {student.campus.name}
          </Link>
        </h3>
      ) : (
        <h3>Not Enrolled in any Campus</h3>
      )}
      <img src={student.image_url} alt={`${student.firstname} ${student.lastname}`} style={{maxWidth: '300px', maxHeight: '300px', margin: '10px'}} />
      <p>Email: {student.email}</p>
      <p>GPA: {formattedGPA}</p>

      <Link to={`/editstudent/${student.id}`}>
        <button>Edit Student</button>
      </Link>
      <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
    </div>
  );
};

export default StudentView;