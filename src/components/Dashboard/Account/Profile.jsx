import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { getUser, updateUser } from "../../../redux/user/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Notifications from '../../Common/Notifications';
import toast, { Toaster } from "react-hot-toast";

import NameChange from './NameChange'
import EmailChange from './EmailChange'
import PasswordChange from './PasswordChange'
import TwoFactorEnable from './TwoFactorEnable'

export default function Profile() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Personal Settings</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <NameChange />
          <EmailChange />
          <PasswordChange />
          <TwoFactorEnable />
        </div>
      </div>

    </main>
  );
}