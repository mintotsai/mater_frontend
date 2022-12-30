import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { reset } from "../../redux/auth/actions";
import SystemMessage from "../Common/SystemMessage"
import { clearMessage } from '../../helpers/messages';

const PasswordReset = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const system = useSelector((state) => state.system);

  useEffect(() => {
    // We do this because of async callout
    let mounted = true;

    clearMessage(dispatch);

    const resetPasswordToken = searchParams.get("reset_password_token");
    if (!resetPasswordToken) navigate("/login");

    return () => (mounted = false);
  }, []);

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
                  .required('Required')
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/,
                    "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
                  ),
                passwordConfirmation: Yup.string()
                  .required('Required')
                  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
              })}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // same shape as initial values
                // console.log(values);
                const resetPasswordToken = searchParams.get("reset_password_token");
                dispatch(reset(navigate, { user: { reset_password_token: resetPasswordToken, password: values["password"], password_confirmation: values["passwordConfirmation"] } }));
              }}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form className="space-y-6" action="#" method="POST">
                  <SystemMessage />

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