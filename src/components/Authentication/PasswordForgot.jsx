import React from 'react';
import authenticationApi from '../../apis/authentication';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PasswordForgot = () => {

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Required'),
              })}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // console.log(values);
                resetForm();
                try {
                  const response = await authenticationApi.forgot({ user: { email: values["email"] } });
                  // console.log(">>>");
                  // console.log(response);
                  setStatus({
                    success: true,
                    msg: "Password reset email has been sent."
                  })
                } catch (error) {
                  setStatus({
                    success: false,
                    msg: error
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage component="p" name="email" className="mt-2 text-sm text-red-600" />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      Sign in
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

export default PasswordForgot;