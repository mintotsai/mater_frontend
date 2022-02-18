import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../../redux/user/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Notifications from '../../Common/Notifications';
import toast, { Toaster } from "react-hot-toast";

import EmailChange from './EmailChange'
import PasswordChange from './PasswordChange'

export default function Profile() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);

  // Unnecessary atm
  // useEffect(() => {
  //   console.log("useEffect: mount");
  //   const fetchData = async () => {
  //     // get the data from the api
  //     dispatch(getUser(auth.user.userId))
  //      .then(() => {
  //      })
  //      .catch(() => {
  //        // TODO: Error message
  //      });

  //     return () => {
  //       console.log("useEffect: unmount");
  //     }
  //   }

  //   fetchData();

  // }, [])

  return (
    <main className="flex-1">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Personal Settings</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <EmailChange />
          <PasswordChange />
        </div>
      </div>
    </main>
  );
}