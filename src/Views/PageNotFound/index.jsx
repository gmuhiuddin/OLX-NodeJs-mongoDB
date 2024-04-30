import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} style={styles.link}>Go back to homepage</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px'
  },
  heading: {
    fontSize: '48px',
    marginBottom: '20px'
  },
  text: {
    fontSize: '20px',
    marginBottom: '20px'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px'
  }
};

export default NotFound