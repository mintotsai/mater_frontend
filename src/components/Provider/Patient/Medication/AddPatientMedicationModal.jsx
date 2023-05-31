import { Dialog, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { Fragment, useEffect, useRef } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import Datepicker from "react-tailwindcss-datepicker";
import * as Yup from 'yup';
import { createMedicationList, getMedications } from "../../../../redux/provider/actions";

export default function AddPatientMedicationModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);
  const navigate = useNavigate();
  const loadingActions = useSelector((state) => state.system.loadingActions);
  const { id } = useParams();
  const medications = useSelector((state) => state.providerUser.medications)

  let options = [];
  if (medications) {
    options = medications.map(medication => {
      return {
        value: medication.id,
        label: medication.attributes.name + " - " + medication.attributes.strength,
        details: {
          name: medication.attributes.name,
          strength: medication.attributes.strength,
        }
      };
    });
  } else {
    medications = [];
  }

  useEffect(() => {
    dispatch(getMedications());
  }, [dispatch]);

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
                  medicationId: "",
                  medicationName: "",
                  medicationStrength: "",
                  medicationStartDate: { startDate: format(new Date(), 'yyyy-MM-dd'), endDate: format(new Date(), 'yyyy-MM-dd') },
                  medicationEndDate: {},
                  selectedPeriodOfDay: [],
                }}
                validationSchema={Yup.object().shape({
                  medicationId: Yup.string(),
                  medicationName: Yup.string().required('Required'),
                  medicationStrength: Yup.string(),
                  medicationStartDate: Yup.object(),
                  medicationEndDate: Yup.object(),
                  selectedPeriodOfDay: Yup.array().min(1, "Select at least one period of day.")
                })}
                onSubmit={async (values, { setStatus, resetForm }) => {
                  // console.log(">>>" + JSON.stringify(values, null, 2));

                  // "notes": "Test Notes",
                  // "medication_id": "0d052514-9c86-4eea-9981-440e7e6b4129",
                  // "patient_id": "f51288db-dee6-4f41-80a7-66a7b4fe20a6"
                  let medicationParams = {
                    "medication_list": {
                      "medication_id": values["medicationId"],
                      "name": values["medicationName"],
                      "strength": values["medicationStrength"],
                      "period_of_day": values["selectedPeriodOfDay"],
                      "start_date": new Date(values["medicationStartDate"]["startDate"]),
                      "end_date": new Date(values["medicationEndDate"]["startDate"]),
                      "patient_id": id
                    }
                  }
                  // console.log(">>>medicationParams=" + JSON.stringify(medicationParams));

                  dispatch(createMedicationList(medicationParams))
                    .then((response) => {
                      handleClose();
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
                          <h3 className="text-lg font-medium leading-6 text-gray-900">Medication</h3>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-5">
                          <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              Name
                            </label>
                            {/* https://chat.openai.com/c/6f44bd71-9798-4cc6-bbcf-88b6cc42cfd5 */}
                            <CreatableSelect
                              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              onChange={(x) => {
                                if (x.__isNew__) {
                                  setFieldValue("medicationName", x.label);
                                } else {
                                  setFieldValue("medicationId", x.value);
                                  setFieldValue("medicationName", x.details?.name);
                                  setFieldValue("medicationStrength", x.details?.strength);
                                }
                              }}
                              options={options}
                            />
                            <ErrorMessage component="p" name="medicationName" className="mt-2 text-sm text-red-600" />
                          </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-5">
                          <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              Strength
                            </label>
                            <Field
                              type="text"
                              name="medicationStrength"
                              id="medicationStrength"
                              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              required
                            />
                            <ErrorMessage component="p" name="medicationStrength" className="mt-2 text-sm text-red-600" />
                          </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-5">
                          <div className="col-span-6 sm:col-span-6">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              Period of Day
                            </label>
                            <span className="isolate inline-flex rounded-md shadow-sm mt-1">
                              <label
                                className={`${values.selectedPeriodOfDay.includes('morning') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-50'
                                  } relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 cursor-pointer select-none`}
                              >
                                <Field
                                  type="checkbox"
                                  name="selectedPeriodOfDay"
                                  value="morning"
                                  className="form-checkbox hidden"
                                  checked={values.selectedPeriodOfDay.includes('morning')}
                                  onChange={() => {
                                    if (values.selectedPeriodOfDay.includes('morning')) {
                                      const updatedOptions = values.selectedPeriodOfDay.filter((option) => option !== 'morning');
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    } else {
                                      const updatedOptions = [...values.selectedPeriodOfDay, 'morning'];
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    }
                                  }}
                                />
                                Morning
                              </label>
                              <label
                                className={`${values.selectedPeriodOfDay.includes('noon') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-50'
                                  } relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 cursor-pointer select-none`}
                              >
                                <Field
                                  type="checkbox"
                                  name="selectedPeriodOfDay"
                                  value="noon"
                                  className="form-checkbox hidden"
                                  checked={values.selectedPeriodOfDay.includes('noon')}
                                  onChange={() => {
                                    if (values.selectedPeriodOfDay.includes('noon')) {
                                      const updatedOptions = values.selectedPeriodOfDay.filter((option) => option !== 'noon');
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    } else {
                                      const updatedOptions = [...values.selectedPeriodOfDay, 'noon'];
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    }
                                  }}
                                />
                                Noon
                              </label>
                              <label
                                className={`${values.selectedPeriodOfDay.includes('evening') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-50'
                                  } relative -ml-px inline-flex items-center px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 cursor-pointer select-none`}
                              >
                                <Field
                                  type="checkbox"
                                  name="selectedPeriodOfDay"
                                  value="evening"
                                  className="form-checkbox hidden"
                                  checked={values.selectedPeriodOfDay.includes('evening')}
                                  onChange={() => {
                                    if (values.selectedPeriodOfDay.includes('evening')) {
                                      const updatedOptions = values.selectedPeriodOfDay.filter((option) => option !== 'evening');
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    } else {
                                      const updatedOptions = [...values.selectedPeriodOfDay, 'evening'];
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    }
                                  }}
                                />
                                Evening
                              </label>
                              <label
                                className={`${values.selectedPeriodOfDay.includes('bed') ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-50'
                                  } relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 cursor-pointer select-none`}
                              >
                                <Field
                                  type="checkbox"
                                  name="selectedPeriodOfDay"
                                  value="bed"
                                  className="form-checkbox hidden"
                                  checked={values.selectedPeriodOfDay.includes('bed')}
                                  onChange={() => {
                                    if (values.selectedPeriodOfDay.includes('bed')) {
                                      const updatedOptions = values.selectedPeriodOfDay.filter((option) => option !== 'bed');
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    } else {
                                      const updatedOptions = [...values.selectedPeriodOfDay, 'bed'];
                                      setFieldValue('selectedPeriodOfDay', updatedOptions);
                                    }
                                  }}
                                />
                                Bed
                              </label>
                            </span>
                            <ErrorMessage component="p" name="selectedPeriodOfDay" className="mt-2 text-sm text-red-600" />
                          </div>
                        </div>
                        <div className="grid grid-cols-6 gap-6 mt-5">
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              Start Date
                            </label>
                            <Datepicker
                              inputClassName="w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              toggleClassName="absolute right-0 h-full mt-1 px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                              useRange={false}
                              asSingle={true}
                              displayFormat={"MM/DD/YYYY"}
                              placeholder={"Select start date"}
                              maxDate={new Date()}
                              value={values.medicationStartDate}
                              onChange={(date) => setFieldValue('medicationStartDate', { startDate: date.startDate, endDate: date.endDate })}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="systolic" className="block text-sm font-medium text-gray-700">
                              End Date
                            </label>
                            <Datepicker
                              inputClassName="w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              toggleClassName="absolute right-0 h-full mt-1 px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                              useRange={false}
                              asSingle={true}
                              displayFormat={"MM/DD/YYYY"}
                              placeholder={"Select end date"}
                              maxDate={new Date()}
                              value={values.medicationEndDate}
                              onChange={(date) => setFieldValue('medicationEndDate', { startDate: date.startDate, endDate: date.endDate })}
                            />
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
                                  {loadingActions.includes("PROVIDER_CREATE_MEDICATION_LIST_ACTION") && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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