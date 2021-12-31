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
import { LockClosedIcon } from '@heroicons/react/solid'
import authenticationApi from '../../apis/authentication';
import { useAuthDispatch } from '../../contexts/auth';
import { setAuthHeaders, resetAuthTokens } from '../../apis/axios';

const PasswordForgot = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authDispatch = useAuthDispatch();

  const handleSubmitExternally = async e => {
    e.preventDefault()
    // console.log('>>>');
    // const { email, password } = values;
    // console.log(">>>" + email + " " + password);
    try {
      setLoading(true);
      const response = await authenticationApi.forgot({ user: { email } });
      console.log(">>>");
      console.log(response);
      // TODO: Set message
    } catch (error) {

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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
          </div>
          <form className="mt-8 space-y-6" >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmitExternally}
              >
                Send me reset password instructions
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PasswordForgot;