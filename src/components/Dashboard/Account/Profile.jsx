import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser } from "../../../redux/user/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Notifications from '../../Common/Notifications';
import toast, { Toaster } from "react-hot-toast";

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
          {/* Replace with your content */}
          <div className="py-4">
            <Formik
              initialValues={{
                email: auth.user.email,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Required'),
              })}
              onSubmit={async (values, { setStatus, resetForm }) => {
                resetForm();
                const email = values["email"];

                // TODO: update email address
                dispatch(updateUser(auth.user.userId, { user: { email: email } }))
                  .then(() => {
                    // setStatus({
                    //   success: true,
                    //   msg: "Check email to confirm email change"
                    // });
                    toast.success("Check email to confirm email change");
                  })
                  .catch(() => {
                    // TODO: Error message
                    // setStatus({
                    //   success: false,
                    //   msg: "Unable to update email"
                    // });
                    toast.error("Unable to update email");
                  });
              }}
            >
              {({ values, errors, touched, isSubmitting, status, resetForm }) => (
                <Form className="space-y-8 divide-y divide-gray-200">
                  <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Info</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Access your account with any email address.
                        </p>
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <div className="mt-1">
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              required
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              value={values.email}
                            />
                          </div>
                          <ErrorMessage component="p" name="email" className="mt-2 text-sm text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={resetForm}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}