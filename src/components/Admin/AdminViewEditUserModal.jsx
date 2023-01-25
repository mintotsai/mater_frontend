import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/admin/actions";

export default function AdminViewEditUserModal({ open, handleClose, selectedUser }) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  return (
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
                first_name: (selectedUser && selectedUser.attributes && selectedUser.attributes.first_name) ? selectedUser.attributes.first_name : "",
                last_name: (selectedUser && selectedUser.attributes && selectedUser.attributes.last_name) ? selectedUser.attributes.last_name : "",
                email: (selectedUser && selectedUser.attributes && selectedUser.attributes.email) ? selectedUser.attributes.email : ""
              }}
              // validationSchema={{}}
              onSubmit={async (values, { setStatus, resetForm }) => {
                dispatch(updateUser(selectedUser.id, { user: values }))
                  .then((response) => {
                    // console.log("response");
                    // console.log(response);
                    handleClose();
                  })
                  .error((error) => {
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
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Edit User Information</h3>
                      </div>
                      <div className="grid grid-cols-6 gap-6 mt-5">
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <Field
                            type="text"
                            name="first_name"
                            id="first_name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <Field
                            type="text"
                            name="last_name"
                            id="last_name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
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
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6 mt-5">
                        <div className="col-span-6 sm:col-span-3">
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <div className="grid grid-cols-6 gap-1">
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
                            <div className="col-span-4">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                              >
                                Update Information
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
  )
}