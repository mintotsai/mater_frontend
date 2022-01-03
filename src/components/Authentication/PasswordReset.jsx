import React from 'react';
import { useSearchParams } from "react-router-dom";
import authenticationApi from '../../apis/authentication';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PasswordReset = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                password: '',
                passwordConfirmation: '',
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .min(2, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Required'),
                passwordConfirmation: Yup.string()
                  .min(2, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Required')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
              })}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // same shape as initial values
                // console.log(values);
                try {
                  const resetPasswordToken = searchParams.get("reset_password_token");
                  // console.log(">>>reset_password_token: " + resetPasswordToken);
                  const response = await authenticationApi.reset({ user: { reset_password_token: resetPasswordToken, password: values["password"], password_confirmation: values["passwordConfirmation"] } });
                  // console.log(">>>");
                  // console.log(response);

                  if (response.data.error != null) {
                    // TODO: Show errors
                    // TODO: Display array of errors?
                    // console.log("errors");
                    // console.log(response.data.error);
                    setStatus({
                      success: false,
                      // msg: response.data.error.toString()
                      msg: "Please choose another password."
                    })
                  } else {
                    window.location.href = '/login';
                  }
                } catch (error) {
                  // console.log(">>>error=" + error);
                  // TODO: Display array of errors?
                  setStatus({
                    success: false,
                    msg: "Please choose another password."
                  })
                } finally {
                }
              }}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form className="space-y-6" action="#" method="POST">
                  {status && status.msg && (
                    <div className={`rounded-md ${!status.success ? "bg-red-50" : "bg-green-50"} p-4`}>
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${!status.success ? "text-red-800" : "text-green-800"}`}>{status.msg}</h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage component="p" name="password" className="mt-2 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
                      Password Confirmation
                    </label>
                    <div className="mt-1">
                      <Field
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        autoComplete="passwordConfirmation"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage component="p" name="passwordConfirmation" className="mt-2 text-sm text-red-600" />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      Reset Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default PasswordReset;