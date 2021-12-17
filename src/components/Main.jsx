import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { either, isEmpty, isNil } from 'ramda';
import { initializeLogger } from '../common/logger';
import { useAuthState, useAuthDispatch } from '../contexts/auth';
import { setAuthHeaders, registerIntercepts } from '../apis/axios';

import Signup from './Authentication/Signup';
import Login from './Authentication/Login';

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
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;