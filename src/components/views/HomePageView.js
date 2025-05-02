/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */

import { Link } from 'react-router-dom';

const HomePageView = () => {
  const campusImageUrl = "https://t4.ftcdn.net/jpg/04/98/14/49/360_F_498144940_DkzvRAkgBv1ILU6DiDeMZr6vUufPOra4.jpg";
  const studentImageUrl = "https://www.libarts.colostate.edu/wp-content/uploads/2019/08/CSU-Liberal-Arts-students-walking-on-campus.jpg";

  const sectionStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px',
    width: '40%',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: 'white',
  };

  const imageStyle = {
    maxWidth: '53%',
    height: 'auto',
    marginTop: '15px',
    borderRadius: '4px'
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '8px 15px',
    cursor: 'pointer'
  };


  // Render Home page view
  return (
    <div>
      <h1 style={{ color: '#11153e', fontWeight: 'bold' }}>Home Page</h1>
      
      <div style={{ textAlign: 'center' }}> {/* Center the sections */}
        {/* View Campuses Section */}
        <div style={sectionStyle}>
          <h2>View Campuses</h2>
          <Link to={'/campuses'}>
            <button style={buttonStyle}>Click Here!</button>
          </Link>
          <div>
            <img src={campusImageUrl} alt="View Campuses" style={imageStyle} />
          </div>
        </div>

        {/* View Students Section */}
        <div style={sectionStyle}>
          <h2>View Students</h2>
          <Link to={'/students'}>
            <button style={buttonStyle}>Click Here!</button>
          </Link>
          <div>
            <img src={studentImageUrl} alt="View Students" style={imageStyle} />
          </div>
        </div>
      </div>
    </div>
  );    
}

export default HomePageView;