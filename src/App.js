import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { either, isEmpty, isNil } from 'ramda';
// import Main from './components/Main';

// import { AuthProvider } from './contexts/auth';

import { Provider } from 'react-redux'
import store from './redux/store'

import Signup from './components/Authentication/Signup';
import Confirmation from './components/Authentication/Confirmation';
import PasswordForgot from './components/Authentication/PasswordForgot'
import PasswordReset from './components/Authentication/PasswordReset'
import Login from './components/Authentication/Login';
import PrivateRoute from './components/Common/PrivateRoute';
import Home from './components/Dashboard/index';

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/confirmation" element={<Confirmation />} />
        <Route exact path="/forgot" element={<PasswordForgot />} />
        <Route exact path="/reset" element={<PasswordReset />} />
        {!auth.isLoggedIn && <Route exact path="/" element={<Login />} />}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<PrivateRoute path="/" redirectRoute="/login" condition={auth.isLoggedIn} element={<Home />} />} >
          <Route exact path="/*" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
