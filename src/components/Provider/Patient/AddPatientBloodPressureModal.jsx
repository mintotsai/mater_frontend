import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Fragment, useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";
import * as Yup from 'yup';
import { updatePatient } from '../../../redux/provider/actions';
import TimeInput from "../../Common/TimeInput";

export default function AddPatientModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const loadingActions = useSelector((state) => state.system.loadingActions);
  const { id } = useParams();

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
                  systolic: "",
                  diastolic: "",
                  pulse: "",
                  takenAtDate: { startDate: format(new Date(), 'yyyy-MM-dd'), endDate: format(new Date(), 'yyyy-MM-dd') },
                  takenAtTime: format(new Date(), 'H:mm')
                }}
                validationSchema={Yup.object().shape({
                  systolic: Yup.number().required('Required'),
                  diastolic: Yup.number().required('Required'),
                  pulse: Yup.number().required('Required'),
                  takenAtDate: Yup.object(),
                  takenAtTime: Yup.string()
                })}
                onSubmit={async (values, { setStatus, resetForm }) => {
                  // console.log(">>>" + JSON.stringify(values, null, 2));

                  let userParams = {
                    user: {
                      health_measurements_attributes: [
                        {
                          health_measurement_type: "blood_pressure",
                          measurement: {
                            systolic: values["systolic"],
                            diastolic: values["diastolic"],
                            pulse: values["pulse"]
                          },
                          taken_at: new Date(values["takenAtDate"]["startDate"] + " " + values["takenAtTime"])
                        }
                      ]
                    }
                  }

                  dispatch(updatePatient(id, userParams))
                    .then((response) => {
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
                      <Dialog.Panel className="relative transform  rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                        <div>
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Blood Pressure</h3>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-5">
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              Systolic
                            </label>
                            <Field
                              type="text"
                              name="systolic"
                              id="systolic"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="systolic" className="mt-2 text-sm text-red-600" />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="diastolic" className="block text-sm font-medium text-gray-700">
                              Diastolic
                            </label>
                            <Field
                              type="text"
                              name="diastolic"
                              id="diastolic"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="diastolic" className="mt-2 text-sm text-red-600" />
                          </div>
                          <div className="col-span-6 sm:col-span-2">
                            <label htmlFor="pulse" className="block text-sm font-medium text-gray-700">
                              Pulse
                            </label>
                            <Field
                              type="text"
                              name="pulse"
                              id="pulse"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="pulse" className="mt-2 text-sm text-red-600" />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              Taken At
                            </label>
                            <Datepicker
                              inputClassName="w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              toggleClassName="absolute right-0 h-full mt-1 px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                              useRange={false}
                              asSingle={true}
                              displayFormat={"MM/DD/YYYY"}
                              placeholder={"Select measurement date"}
                              maxDate={new Date()}
                              value={values.takenAtDate}
                              onChange={(date) => setFieldValue('takenAtDate', { startDate: date.startDate, endDate: date.endDate })}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <TimeInput label="Time" id="takenAtTime" name="takenAtTime" placeholder="Enter start time in 24 hour format e.g. 08:00" />
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
                                  {loadingActions.includes("PROVIDER_UPDATE_PATIENT_ACTION") && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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