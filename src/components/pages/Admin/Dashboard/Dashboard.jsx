import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      Dashboard page
      <br />
      <Link to="/">To client</Link>
    </div>
  );
};
