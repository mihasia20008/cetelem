import React from 'react';
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      Client Index
      <br />
      <Link to="/admin">To admin</Link>
    </div>
  );
};
