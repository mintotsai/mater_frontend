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

const Signup = () => {
  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setConfirmationPassword] = useState('');
  const authDispatch = useAuthDispatch();

  const handleSubmitExternally = async e => {
    e.preventDefault()
    // console.log('>>>');
    // const { email, password } = values;
    // console.log(">>>" + email + " " + password);
    try {
      setLoading(true);
      const response = await authenticationApi.signup({ user: { email, password, password_confirmation: passwordConfirmation, } });
      console.log(">>>");
      console.log(response);
      let auth_token;
      if (response.headers.authorization && response.headers.authorization.split(' ')[0] === 'Bearer') {
        auth_token = response.headers.authorization.split(' ')[1];
      }
      authDispatch({ type: 'LOGIN', payload: { auth_token, email } });
      // userDispatch({ type: 'SET_USER', payload: { user } });
      resetAuthTokens();
      setAuthHeaders();
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
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>
                <div className="mt-1">
                  <input
                    id="password-confirmation"
                    name="password-confirmation"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleSubmitExternally}
                >
                  Sign up
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;