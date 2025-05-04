/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
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
}));

const NewStudentView = (props) => {
  const {handleChange, handleBlur ,handleSubmit , errors, isFormValid} = props;
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
              Add a Student
            </Typography>
          </div>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
              <input type="text" name="firstname" onChange ={(e) => handleChange(e)} onBlur={handleBlur} required />
              {errors.firstname && <span className={classes.error}>{errors.firstname}</span>}
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
              <input type="text" name="lastname" onChange={(e) => handleChange(e)} onBlur={handleBlur} required />
              {errors.lastname && <span className={classes.error}>{errors.lastname}</span>}
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
              <input type="email" name="email" onChange={(e) => handleChange(e)} onBlur={handleBlur} required />
              {errors.email && <span className={classes.error}>{errors.email}</span>}
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Image URL (Optional): </label>
              <input type="text" name="image_url" onChange={(e) => handleChange(e)} onBlur={handleBlur} />
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>GPA: (Optional): </label>
              <input type="number" name="gpa" min="0.0" max="4.0" step="0.01" onChange={(e) => handleChange(e)} onBlur={handleBlur} />
              {errors.gpa && <span className={classes.error}>{errors.gpa}</span>}
            </div>
            <br/>

            <div>
              <label style={{color:'#11153e', fontWeight: 'bold'}}>Campus Id (Optional): </label>
              <input type="text" name="campusId" onChange={(e) => handleChange(e)} onBlur={handleBlur} />
            </div>
            <br/>

            <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
              Submit
            </Button>
            <br/>
            {errors.form && <p className={classes.error} style={{textAlign: 'center'}}>{errors.form}</p>} 
            <br/>
          </form>
          </div>
      </div>
    </div>
  )
}

export default NewStudentView;