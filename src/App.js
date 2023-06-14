import React from 'react';
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import store from './redux/store';

import Profile from './components/Account/Profile';
import TwoFactorSetup from "./components/Account/TwoFactorSetup";
import AdminViewUsers from "./components/Admin/AdminViewUsers";
import Confirmation from './components/Authentication/Confirmation';
import Login from './components/Authentication/Login';
import PasswordForgot from './components/Authentication/PasswordForgot';
import PasswordReset from './components/Authentication/PasswordReset';
import Signup from './components/Authentication/Signup';
import Unlock from "./components/Authentication/Unlock";
import Verify from './components/Authentication/Verify';
import MainLayout from "./components/Common/MainLayout";
import NotificationList from "./components/Common/NotificationList";
import PageNotFound404 from "./components/Common/PageNotFound404";
import PermissionsGate from "./components/Common/PermissionsGate";
import PrivateRoute from './components/Common/PrivateRoute';
import MainSection from './components/Dashboard/MainSection';
import PrintMedicationList from './components/Provider/Patient/Medication/PrintMedicationList';
import PrintBloodPressure from "./components/Provider/Patient/PrintBloodPressure";
import ProviderDataImport from "./components/Provider/ProviderDataImport";
import ProviderEditPatient from "./components/Provider/ProviderEditPatient";
import ProviderPatients from "./components/Provider/ProviderPatients";
import { ROLES } from "./helpers/roles";

export default function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/confirmation" element={<Confirmation />} />
          <Route exact path="/unlock" element={<Unlock />} />
          <Route exact path="/forgot" element={<PasswordForgot />} />
          <Route exact path="/reset" element={<PasswordReset />} />
          <Route path="/404" element={<PageNotFound404 />} />

          {/* TODO: Back button from Verify page */}
          {auth.showOTPScreen && <Route exact path="/verify" element={<Verify />} />}

          <Route exact path="/" element={<PrivateRoute path="/" redirectRoute="/login" condition={auth.isLoggedIn} />} >
            <Route path="/" element={<MainLayout />}>
              <Route path="home" element={<MainSection />} />
              <Route path="settings/account" element={<Profile />} />
              <Route path="settings/account/2fasetup" element={<TwoFactorSetup />} />
              <Route path="notifications" element={<NotificationList />} />

              {/* Provider Routes */}
              <Route path="provider" element={<PermissionsGate allowedRoles={[ROLES.provider]}
                pageNotFound={true}
              />} >
                <Route path="patients" element={<ProviderPatients />} />
                <Route path="patients/:id/edit" element={<ProviderEditPatient />} />
                <Route path="data-import" element={<ProviderDataImport />} />

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

            {/* Putting this outside of the MainLayout */}
            <Route path="/provider/patients/blood-pressure/print" element={<PrintBloodPressure />} />
            <Route path="/provider/patients/medication-list/print" element={<PrintMedicationList />} />
          </Route>

          {/* https://stackoverflow.com/a/73922302/1391412 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
