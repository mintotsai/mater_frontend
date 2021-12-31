/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { LockClosedIcon } from '@heroicons/react/solid'
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { setAuthHeaders, resetAuthTokens } from '../../apis/axios';

const Login = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setConfirmationPassword] = useState('');
  const [password, setPassword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmitExternally = async e => {
    e.preventDefault()
    // console.log('>>>');
    // const { email, password } = values;
    // console.log(">>>" + email + " " + password);
    try {
      setLoading(true);
      const resetPasswordToken = searchParams.get("reset_password_token");
      console.log(">>>reset_password_token: " + resetPasswordToken);
      const response = await authenticationApi.reset({ user: { reset_password_token: resetPasswordToken, password: password, password_confirmation: passwordConfirmation } });
      console.log(">>>");
      console.log(response);

      if (response.data.error != null) {
        // TODO: Show errors
        console.log("errors");
        console.log(response.data.error);
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      console.log(">>>error=" + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      {/* <div>
        Hello
      </div> */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
          </div>
          <form className="mt-8 space-y-6" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password-confirmation" className="sr-only">
                  Password Confirmation
                </label>
                <input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  autoComplete="password-confirmation"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password Confirmation"
                  onChange={(e) => setConfirmationPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmitExternally}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;