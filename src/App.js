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
import Verify from './components/Authentication/Verify';
import MainSection from './components/Dashboard/MainSection';
import Profile from './components/Dashboard/Account/Profile'
import Checkout from './components/Dashboard/Account/Billing/Checkout';
import TwoFactorSetup from "./components/Dashboard/Account/TwoFactorSetup"
import NotificationList from "./components/Dashboard/NotificationList"

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
        {/* TODO: Back button from Verify page */}
        {auth.showOTPScreen && <Route exact path="/verify" element={<Verify />} />}
        <Route exact path="/" element={<PrivateRoute path="/" redirectRoute="/login" condition={auth.isLoggedIn} element={<Home />} />} >

          <Route path="/" element={<Home />}>
            <Route path="home" element={<MainSection />} />
            <Route path="settings/account" element={<Profile />} />
            <Route path="settings/account/2fasetup" element={<TwoFactorSetup />} />
            <Route path="settings/account/checkout" element={<Checkout />} />
            <Route path="notifications" element={<NotificationList />} />
          </Route>
          {/* TODO: Do we need this? */}
          {/* <Route exact path="/*" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
