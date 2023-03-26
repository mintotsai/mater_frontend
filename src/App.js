import React from 'react';
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from './redux/store';

import AdminViewUsers from "./components/Admin/AdminViewUsers";
import Confirmation from './components/Authentication/Confirmation';
import Login from './components/Authentication/Login';
import PasswordForgot from './components/Authentication/PasswordForgot';
import PasswordReset from './components/Authentication/PasswordReset';
import Signup from './components/Authentication/Signup';
import Unlock from "./components/Authentication/Unlock";
import Verify from './components/Authentication/Verify';
import PageNotFound404 from "./components/Common/PageNotFound404";
import PermissionsGate from "./components/Common/PermissionsGate";
import PrivateRoute from './components/Common/PrivateRoute';
import Checkout from './components/Dashboard/Account/Billing/Checkout';
import Profile from './components/Dashboard/Account/Profile';
import TwoFactorSetup from "./components/Dashboard/Account/TwoFactorSetup";
import Home from './components/Dashboard/index';
import MainSection from './components/Dashboard/MainSection';
import NotificationList from "./components/Dashboard/NotificationList";
import ProviderEditPatient from "./components/Provider/ProviderEditPatient";
// import ProviderNewPatient from "./components/Provider/ProviderNewPatient";
import ProviderPatients from "./components/Provider/ProviderPatients";
// import ProviderViewPatient from "./components/Provider/ProviderViewPatient";
import { ROLES } from "./helpers/roles";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Provider store={store}>
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

              {/* Provider Routes */}
              <Route path="provider" element={<PermissionsGate allowedRoles={[ROLES.provider]}
                pageNotFound={true}
              />} >
                <Route path="patients" element={<ProviderPatients />} />
                {/* <Route path="patients/new" element={<ProviderNewPatient />} /> */}
                {/* <Route path="patients/:id/view" element={<ProviderViewPatient />} /> */}
                <Route path="patients/:id/edit" element={<ProviderEditPatient />} />
                {/* https://stackoverflow.com/a/72713882/1391412 */}
                <Route index element={<Navigate to='patients' />} />
              </Route>

              {/* Admin Routes */}
              <Route path="admin" element={<PermissionsGate allowedRoles={[ROLES.admin]}
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
    </Provider>
  );
}

export default App;
