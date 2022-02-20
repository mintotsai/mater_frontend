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

  return (
    <div className="py-4">
      <Formik
        initialValues={{
          firstName: auth.user.attributes.first_name ? auth.user.attributes.first_name : "",
          lastName: auth.user.attributes.last_name ? auth.user.attributes.last_name : "",
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string(),
        })}
        onSubmit={async (values, { setStatus, resetForm }) => {
          const firstName = values["firstName"];
          const lastName = values["lastName"];

          dispatch(updateUser(auth.user.id, { user: { first_name: firstName, last_name: lastName } }))
            .then(() => {
              toast.success("Successfully, changed your name.");
            })
            .catch(() => {
              system.message.map(function (name, index) {
                toast.error(name.title);
              });
            });
        }}
      >
        {({ values, errors, touched, isSubmitting, status, resetForm }) => (
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Name</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tell us who you are
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={values.firstName}
                      />
                    </div>
                    <ErrorMessage component="p" name="firstName" className="mt-2 text-sm text-red-600" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={values.lastName}
                      />
                    </div>
                    <ErrorMessage component="p" name="lastName" className="mt-2 text-sm text-red-600" />
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
  );
}