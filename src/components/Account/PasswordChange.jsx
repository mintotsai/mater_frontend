import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { updatePassword } from "../../redux/auth/actions";

export default function Profile() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: ""
        }}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string()
            .required('Required')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/,
              "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
          newPassword: Yup.string()
            .required('Required')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})/,
              "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
          confirmNewPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
        })}
        onSubmit={async (values, { setStatus, resetForm }) => {
          // resetForm();
          const currentPassword = values["currentPassword"];
          const newPassword = values["newPassword"];
          const confirmNewPassword = values["confirmNewPassword"];

          dispatch(updatePassword({ user: { email: auth.user.attributes.email, current_password: currentPassword, password: newPassword, password_confirmation: confirmNewPassword } }));
        }}
      >
        {({ values, errors, touched, isSubmitting, status, resetForm }) => (
          <section aria-labelledby="billing-history-heading" className="mt-5">
            <Form className="">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Password</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Change and Reset Password
                    </p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={values.currentPassword}
                        />
                      </div>
                      <ErrorMessage component="p" name="currentPassword" className="mt-2 text-sm text-red-600" />
                    </div>
                    <div className="sm:col-span-6">
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={values.newPassword}
                        />
                      </div>
                      <ErrorMessage component="p" name="newPassword" className="mt-2 text-sm text-red-600" />
                    </div>
                    <div className="sm:col-span-6">
                      <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <div className="mt-1">
                        <Field
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          type="password"
                          required
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          value={values.confirmNewPassword}
                        />
                      </div>
                      <ErrorMessage component="p" name="confirmNewPassword" className="mt-2 text-sm text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
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
          </section>
        )}
      </Formik>
    </>
  );
}