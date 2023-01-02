import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, updateUser, confirmMFA } from "../../../redux/user/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import QRCode from 'qrcode.react';

import { getQRCodeUri } from "../../../redux/user/actions";

export default function TwoFactorSetup() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  // Might be an issue calling asyc in useEffect
  // https://dev.to/elijahtrillionz/cleaning-up-async-functions-in-reacts-useeffect-hook-unsubscribing-3dkk
  useEffect(() => {
    console.log("useEffect: mount");

    const fetchData = async () => {
      // get the data from the api
      dispatch(getQRCodeUri());

      return () => {
        console.log("useEffect: unmount");
      }
    }

    fetchData();

  }, []);

  return (
    <div className="py-4">
      <Formik
        initialValues={{
          qrCodeUri: user.qrCodeUri ? user.qrCodeUri : "",
          qrSecret: user.qrSecret ? user.qrSecret : "",
          mfaCode: "",
        }}
        validationSchema={Yup.object().shape({
          mfaCode: Yup.string().required('Required'),
        })}
        onSubmit={async (values, { setStatus, resetForm }) => {
          const mfaCode = values["mfaCode"];

          dispatch(confirmMFA({ mfa: { code: mfaCode } }, navigate))
            .then((response) => {
              navigate(response.navigateTo);
            })
            .catch((error) => {

            });
        }}
      >
        {({ values, errors, touched, isSubmitting, status, resetForm }) => (
          <Form className="space-y-8 divide-y divide-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="m-10">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Scan QR Code</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Please scan the below QR code using Google Authenticator.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6 flex justify-center">
                    <QRCode value={user.qrCodeUri} />
                  </div>
                </div>
                <div>
                  <p className="mt-6 text-sm text-gray-500">
                    If you cannot scan, please enter the following
                    code manually: {user.qrSecret}
                  </p>
                </div>
              </div>
              <div className="m-10">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm MFA Code</h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <Field
                      id="mfaCode"
                      name="mfaCode"
                      type="text"
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={values.mfaCode}
                    />
                    <ErrorMessage component="p" name="mfaCode" className="mt-2 text-sm text-red-600" />
                    <button
                      type="submit"
                      className="mt-6 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Confirm MFA
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div >
  );
}