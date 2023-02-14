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
import Unlock from "./components/Authentication/Unlock";
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
import PermissionsGate from "./components/Common/PermissionsGate";
import PageNotFound404 from "./components/Common/PageNotFound404";

import AdminViewUsers from "./components/Admin/AdminViewUsers";

import { ROLES } from "./helpers/roles";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/confirmation" element={<Confirmation />} />
        <Route exact path="/unlock" element={<Unlock />} />
        <Route exact path="/forgot" element={<PasswordForgot />} />
        <Route exact path="/reset" element={<PasswordReset />} />
        <Route path="/404" element={<PageNotFound404 />} />
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

            {/* Admin Routes */}
            <Route path="admin" element={<PermissionsGate allowedRoles={[ROLES.ADMINISTRATOR]}
              pageNotFound={true}
            />} >
              <Route path="users" element={<AdminViewUsers />} />

              {/* https://stackoverflow.com/a/72713882/1391412 */}
              <Route index element={<Navigate to='users' />} />
            </Route>
          </Route>
          {/* TODO: Do we need this? */}
          {/* <Route exact path="/*" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} /> */}
          {/* <Route path="*" element={<PageNotFound404 />} /> */}

        </Route>

        {/* https://stackoverflow.com/a/73922302/1391412 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
