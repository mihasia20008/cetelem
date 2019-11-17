import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      Admin Index
      <br />
      <Link to="/">To client</Link>
    </div>
  );
};
