import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

export const PrivateRoute = ({
  isAuthenticated,
  component,
  ...rest
}) => (
  isAuthenticated ? (
    <div>
      <Header />
      {component}
    </div>
  ) : (
    <Navigate to="/" />
  )
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
