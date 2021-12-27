import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { either, isEmpty, isNil } from 'ramda';
import { initializeLogger } from '../common/logger';
import { useAuthState, useAuthDispatch } from '../contexts/auth';
import { setAuthHeaders, registerIntercepts } from '../apis/axios';

import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import PrivateRoute from './Common/PrivateRoute';
import Home from './Dashboard/index';
import MainSection from './Dashboard/MainSection';

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuthState();
  const authDispatch = useAuthDispatch();
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  useEffect(() => {
    console.log(props)
    // if (props?.user)
    //   userDispatch({ type: 'SET_USER', payload: { user: props.user } });
    initializeLogger();
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        {!isLoggedIn && <Route exact path="/" element={<Login />} />}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<PrivateRoute path="/" redirectRoute="/login" condition={isLoggedIn} element={<Home />} />} >
          <Route exact path="/*" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;