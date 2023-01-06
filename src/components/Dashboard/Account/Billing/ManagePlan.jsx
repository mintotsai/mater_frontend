import { Fragment, useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { CheckIcon, XIcon } from '@heroicons/react/outline'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { cancelSubscription, getSubscription } from '../../../../redux/billing/actions';
import CancelSubscription from './CancelSubscription';

export default function Checkout({ handleClose }) {
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.billing.subscription);

  useEffect(() => {
    // We do this because of async callout
    let mounted = true;

    dispatch(getSubscription());

    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className="min-h-full flex fixed w-full h-full top-0 left-0 z-50 bg-indigo-700">
        <div className="flex flex-1 justify-center ">
          <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-0 lg:pr-8 m-auto">
            <div className="max-w-lg mx-auto lg:mx-0">
              <h2 className="text-base font-semibold tracking-wide text-white uppercase">Put logo here</h2>
              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Manage your Jasmine subscription
              </p>
              <dl className="mt-12 space-y-10">

              </dl>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center bg-white">
          <div className="max-w-lg py-16 px-2 mx-auto lg:px-1 m-auto">
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                className="rounded-md text-black hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => handleClose()}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <Formik
              // Must have initialValue or the onSubmit doesn't work
              initialValues={{}}
              // validationSchema={{}}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // resetForm();


              }}
            >
              {({ values, errors, touched, isSubmitting, status, resetForm, stripe, elements }) => (
                <Form className="grid grid-cols-6 gap-4">
                  {/*
                  <div className="col-span-3">
                    <label className="block mb-1 text-sm text-white" htmlFor="first_name">
                      First Name
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="frst_name"
                    />
                  </div>

                  <div className="col-span-6">
                    <button
                      className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                      type="submit"
                    >
                      Pay Now
                    </button>
                    <a href="#" className="mt-5 block text-center text-base text-sm font-medium text-indigo-200 hover:text-white"
                      onClick={(e) => { e.preventDefault(); handleClose(); }}
                    >
                      Cancel
                    </a>
                  </div> */}
                </Form>
              )}
            </Formik>
            <CancelSubscription />
          </div>
        </div>
      </div>
    </>
  );
};