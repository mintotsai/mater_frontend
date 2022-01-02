import React from 'react';
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { setAuthHeaders, resetAuthTokens } from '../../apis/axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const authDispatch = useAuthDispatch();

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Required'),
                password: Yup.string()
                  .min(2, 'Too Short!')
                  .max(50, 'Too Long!')
                  .required('Required'),
              })}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // console.log(values);
                resetForm();
                // console.log('>>>');
                // const { email, password } = values;
                // console.log(">>>" + email + " " + password);
                try {
                  const response = await authenticationApi.login({ user: { email: values["email"], password: values["password"] } });
                  // console.log(">>>");
                  // console.log(response);
                  let auth_token;
                  if (response.headers.authorization && response.headers.authorization.split(' ')[0] === 'Bearer') {
                    auth_token = response.headers.authorization.split(' ')[1];
                  }
                  authDispatch({ type: 'LOGIN', payload: { auth_token, email: values["email"] } });
                  // userDispatch({ type: 'SET_USER', payload: { user } });
                  resetAuthTokens();
                  setAuthHeaders();
                  // TODO: last location?
                  window.location.href = '/home';
                } catch (error) {
                  // console.log(">>>");
                  // console.log(error.response.data);
                  // TODO: Is this the best?
                  setStatus({
                    success: false,
                    msg: error.response.data.error
                  })
                } finally {
                }
              }}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form className="space-y-6">
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage component="p" name="password" className="mt-2 text-sm text-red-600" />
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                      </a>
                    </div>
                  </div> */}

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default Login;