import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { createPatient } from '../../../redux/provider/actions';

export default function AddPatientModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const loadingActions = useSelector((state) => state.system.loadingActions);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => handleClose()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Formik
                // Must have initialValue or the onSubmit doesn't work
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                }}
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required('Required'),
                  lastName: Yup.string().required('Required'),
                  email: Yup.string().email('Invalid email').required('Required'),
                })}
                onSubmit={async (values, { setStatus, resetForm }) => {
                  // console.log(">>>" + JSON.stringify(values, null, 2));

                  let params = {};
                  params["user_profile_first_name"] = values["firstName"];
                  params["user_profile_last_name"] = values["lastName"];
                  params["email"] = values["email"];

                  dispatch(createPatient({ user: params }))
                    .then((response) => {
                      resetForm();
                      const patientId = response.data.data.id;
                      navigate("/provider/patients/" + patientId + "/edit");
                    })
                    .catch((error) => {
                      console.log(">>>error");
                      console.log(error);
                    });


                }}
              >
                {({ values, errors, touched, isSubmitting, handleChange, status, resetForm, setFieldValue }) => (
                  <Form>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Patient Information</h3>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-5">
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                              First Name
                            </label>
                            <Field
                              type="text"
                              name="firstName"
                              id="firstName"
                              autoComplete="given-name"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="firstName" className="mt-2 text-sm text-red-600" />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                              Last Name
                            </label>
                            <Field
                              type="text"
                              name="lastName"
                              id="lastName"
                              autoComplete="given-name"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="lastName" className="mt-2 text-sm text-red-600" />
                          </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-3">
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <Field
                              type="text"
                              name="email"
                              id="email"
                              autoComplete="email"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="email" className="mt-2 text-sm text-red-600" />
                          </div>
                        </div>

                        <div className="grid grid-cols-6 gap-6 mt-5">
                          {/* TODO: Is this the best way? */}
                          <div className="col-span-6 sm:col-span-3">
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <div className="grid grid-cols-6 gap-1">
                              {/* TODO: Is this the best way? */}
                              <div className="col-span-2 mr-2">
                              </div>
                              <div className="col-span-2 mr-2">
                                <button
                                  type="button"
                                  className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-sm font-medium text-gray-500 shadow-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                  onClick={() => handleClose()}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                              <div className="col-span-2">
                                <button
                                  type="submit"
                                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                >
                                  {loadingActions.includes("PROVIDER_CREATE_PATIENT_ACTION") && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>}
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Dialog>
      </Transition.Root >
    </>
  )
}