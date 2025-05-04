import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  error: {
    color: 'red',
    fontSize: '0.8em',
    marginLeft: '5px',
  }
}));

const EditStudentView = (props) => {
  const { student, handleChange, handleSubmit, errors, isFormValid } = props;
  const classes = useStyles();
  const formattedGPA = student.gpa != null ? parseFloat(student.gpa).toFixed(2) : "";

  return (
    <div>
      <h1>Edit Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Edit Student Details
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
              <input type="text" name="firstname" defaultValue={student.firstname} onChange ={(e) => handleChange(e)} required />
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
              <input type="text" name="lastname" defaultValue={student.lastname} onChange={(e) => handleChange(e)} required />
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
              <input type="email" name="email" defaultValue={student.email} onChange={(e) => handleChange(e)} required />
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
              <input type="text" name="image_url" defaultValue={student.image_url || ''} onChange={(e) => handleChange(e)} />
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
              <input type="number" name="gpa" defaultValue={formattedGPA} min="0.0" max="4.0" step="0.01" onChange={(e) => handleChange(e)} />
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id: </label>
              <input type="text" name="campusId" defaultValue={student.campusId || ''} onChange={(e) => handleChange(e)} />
            </div>
            <br/>

            <Button variant="contained" color="primary" type="submit"> 
              Save Changes
            </Button>
            <br/>
            <br/>
          </form>
          </div>
      </div>
    </div>    
  )
}

export default EditStudentView;