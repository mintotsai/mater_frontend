import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { verify } from "../../redux/auth/actions";
import { SET_MESSAGE_ACTION } from "../../redux/system/actions"
import SystemMessage from "../Common/SystemMessage"
import { clearMessage } from '../../helpers/messages';

const Verify = () => {

  const dispatch = useDispatch();

  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);
  let navigate = useNavigate();

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify Your Identity</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Formik
              initialValues={{
                verificationCode: '',
              }}
              validationSchema={Yup.object().shape({
                verificationCode: Yup.string().required('Required'),
              })}
              onSubmit={async (values, { setStatus, resetForm }) => {
                const verificationCode = values["verificationCode"];

                await dispatch(verify({ user: { otp_user_id: auth.user.id, otp_attempt: values["verificationCode"] } }))
                  .then((response) => {
                    navigate(response.navigateTo);
                  }).catch((error) => {
                    console.log(">>>error");
                    console.log({ error });
                  });
              }}
            >
              {({ errors, touched, isSubmitting, status }) => (
                <Form className="space-y-6">
                  <SystemMessage />

                  <div>
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                      Verification Code
                    </label>
                    <div className="mt-1">
                      <Field
                        id="verificationCode"
                        name="verificationCode"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <ErrorMessage component="p" name="verificationCode" className="mt-2 text-sm text-red-600" />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Verify
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

export default Verify;