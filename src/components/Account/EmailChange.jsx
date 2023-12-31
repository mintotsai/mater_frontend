import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { updateUser } from "../../redux/user/actions";

export default function Profile() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Formik
        initialValues={{
          email: auth.user.attributes.email,
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Required'),
        })}
        onSubmit={async (values, { setStatus, resetForm }) => {
          resetForm();
          const email = values["email"];

          // TODO: Should we put this in the updateUser dispatch
          if (email == auth.user.attributes.email) {
            toast.error("The email is the same.");
            return;
          }

          dispatch(updateUser(auth.user.id, { user: { email: email } }));
        }}
      >
        {({ values, errors, touched, isSubmitting, status, resetForm }) => (
          <section aria-labelledby="billing-history-heading" className="mt-5">
            <Form className="">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
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