import { parse } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";
import * as Yup from 'yup';
import { updatePatient } from '../../../redux/provider/actions';

export default function EditPersonalInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingActions = useSelector((state) => state.system.loadingActions);
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const { id } = useParams();

  useEffect(() => {
  }, [selectedPatient]);

  const initialValues = {
    file: null,
    firstName: (selectedPatient?.attributes?.user_profile_first_name) ? selectedPatient.attributes.user_profile_first_name : "",
    lastName: (selectedPatient?.attributes?.user_profile_last_name) ? selectedPatient.attributes.user_profile_last_name : "",
    email: (selectedPatient?.attributes?.email) ? selectedPatient.attributes.email : "",
    sex: (selectedPatient?.attributes?.user_profile_sex) ? selectedPatient.attributes.user_profile_sex : "",
    birthdate: (selectedPatient?.attributes?.user_profile_dob) ? { startDate: parse(selectedPatient.attributes.user_profile_dob, 'yyyy-MM-dd', new Date()), endDate: parse(selectedPatient.attributes.user_profile_dob, 'yyyy-MM-dd', new Date()) } : { startDate: null, endDate: null },
    phoneNumberMobile: (selectedPatient?.attributes?.phone_number_mobile) ? selectedPatient.attributes.phone_number_mobile : "",
    mailingAddressLine1: (selectedPatient?.attributes?.mailing_address?.line1) ? selectedPatient?.attributes?.mailing_address?.line1 : "",
    mailingAddressLine2: (selectedPatient?.attributes?.mailing_address?.line2) ? selectedPatient?.attributes?.mailing_address?.line2 : "",
    mailingAddressCity: (selectedPatient?.attributes?.mailing_address?.city) ? selectedPatient?.attributes?.mailing_address?.city : "",
    mailingAddressState: (selectedPatient?.attributes?.mailing_address?.state) ? selectedPatient?.attributes?.mailing_address?.state : "",
    mailingAddressPostalCode: (selectedPatient?.attributes?.mailing_address?.postal_code) ? selectedPatient?.attributes?.mailing_address?.postal_code : "",
    mailingAddressCountry: (selectedPatient?.attributes?.mailing_address?.country) ? selectedPatient?.attributes?.mailing_address?.country : "US",
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('Required'),
          lastName: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          sex: Yup.string(),
          birthdate: Yup.object(),
          phoneNumberMobile: Yup.string(),
          mailingAddressLine1: Yup.string(),
          mailingAddressLine2: Yup.string(),
          mailingAddressCity: Yup.string(),
          mailingAddressState: Yup.string(),
          mailingAddressPostalCode: Yup.string(),
          mailingAddressCountry: Yup.string(),
        })}
        onSubmit={async (values, { setStatus, resetForm, setSubmitting }) => {
          // console.log(">>>values");
          // console.log(values);

          // https://chat.openai.com/c/0f9514d2-11b0-4182-b331-6fd3d1bb7553
          const changedFields = Object.entries(values).filter(
            ([key, value]) => value !== initialValues[key]
          );
          // console.log(">>>changedFields");
          // console.log(changedFields);

          const changedValues = changedFields.reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {}
          );
          // console.log(">>>changedValues");
          // console.log(changedValues);

          const firstName = changedValues["firstName"];
          const lastName = changedValues["lastName"];
          const email = changedValues["email"];
          const sex = changedValues["sex"];
          const dob = changedValues["birthdate"];
          const phoneNumberMobile = changedValues["phoneNumberMobile"];
          const mailingAddressLine1 = changedValues["mailingAddressLine1"];
          const mailingAddressLine2 = changedValues["mailingAddressLine2"];
          const mailingAddressCity = changedValues["mailingAddressCity"];
          const mailingAddressState = changedValues["mailingAddressState"];
          const mailingAddressPostalCode = changedValues["mailingAddressPostalCode"];
          const mailingAddressCountry = changedValues["mailingAddressCountry"];

          // const jsonPayload = JSON.stringify(changedValues);
          // console.log(">>>jsonPayload=" + jsonPayload);

          let userParams = {
            user: {
            }
          }
          if (firstName) {
            userParams["user"]["user_profile_first_name"] = firstName;
          }
          if (lastName) {
            userParams["user"]["user_profile_last_name"] = lastName;
          }
          if (email) {
            userParams["user"]["email"] = email;
          }
          if (sex) {
            userParams["user"]["user_profile_sex"] = sex;
          }
          if (dob) {
            userParams["user"]["user_profile_dob"] = (new Date(dob.startDate)).toISOString();
          }
          if (phoneNumberMobile) {
            userParams["user"]["mobile_number"] = phoneNumberMobile;
          }
          if (mailingAddressLine1 || mailingAddressLine2 || mailingAddressCity || mailingAddressState || mailingAddressPostalCode || mailingAddressCountry) {
            userParams["user"]["mailing_address_attributes"] = {};
            userParams["user"]["mailing_address_attributes"]["line1"] = mailingAddressLine1;
            userParams["user"]["mailing_address_attributes"]["line2"] = mailingAddressLine2;
            userParams["user"]["mailing_address_attributes"]["city"] = mailingAddressCity;
            userParams["user"]["mailing_address_attributes"]["state"] = mailingAddressState;
            userParams["user"]["mailing_address_attributes"]["postal_code"] = mailingAddressPostalCode;
            userParams["user"]["mailing_address_attributes"]["country"] = mailingAddressCountry;
          }
          // console.log(">>>userParams");
          // console.log(userParams);

          dispatch(updatePatient(id, userParams))
            .then((response) => {
            })
            .catch((error) => {
              console.log(">>>error");
              console.log(error);
            });
        }}
      >
        {({ formik, values, errors, touched, dirty, isValid, isSubmitting, status, resetForm, setFieldValue }) => (
          <section aria-labelledby="billing-history-heading" className="mt-5">
            <Form className="">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                    <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
                      {/* <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                          <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                          <button
                            type="button"
                            className="rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            Change
                          </button>
                        </div>
                      </div> */}

                      <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                          First name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          autoComplete="given-name"
                          className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.firstName}
                        />
                        <ErrorMessage component="p" name="firstName" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                          Last name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          autoComplete="family-name"
                          className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.lastName}
                        />
                        <ErrorMessage component="p" name="lastName" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <Field
                          id="email"
                          required
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage component="p" name="email" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="birthdate" className="block text-sm font-medium leading-6 text-gray-900">
                          Birthdate
                        </label>
                        <Datepicker
                          inputClassName="w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          toggleClassName="absolute right-0 h-full mt-1 px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                          useRange={false}
                          asSingle={true}
                          value={values.birthdate}
                          onChange={(date) => setFieldValue('birthdate', { startDate: date.startDate, endDate: date.endDate })}
                          displayFormat={"MM/DD/YYYY"}
                          placeholder={"Select your birthdate"}
                          maxDate={new Date()}
                        />
                        <ErrorMessage component="p" name="birthdate" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-900">
                          Sex
                        </label>
                        <Field as="select" name="sex" className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          <option value=""></option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage component="p" name="sex" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phoneNumberMobile" className="block text-sm font-medium leading-6 text-gray-900">
                          Mobile
                        </label>
                        <Field
                          type="text"
                          name="phoneNumberMobile"
                          id="phoneNumberMobile"
                          autoComplete="family-name"
                          className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.phoneNumberMobile}
                        />
                        <ErrorMessage component="p" name="phoneNumberMobile" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="mailingAddressCountry" className="block text-sm font-medium leading-6 text-gray-900">
                          Mailing Street Country
                        </label>
                        <Field as="select" name="mailingAddressCountry" className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="MX">Mexico</option>
                        </Field>
                        <ErrorMessage component="p" name="mailingAddressCountry" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="mailingAddressLine1" className="block text-sm font-medium leading-6 text-gray-900">
                          Mailing Street 1
                        </label>
                        <Field
                          type="text"
                          name="mailingAddressLine1"
                          id="mailingAddressLine1"
                          autoComplete="family-name"
                          className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.mailingAddressLine1}
                        />
                        <ErrorMessage component="p" name="mailingAddressLine1" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="mailingAddressLine2" className="block text-sm font-medium leading-6 text-gray-900">
                          Mailing Street 2
                        </label>
                        <Field
                          type="text"
                          name="mailingAddressLine2"
                          id="mailingAddressLine2"
                          autoComplete="family-name"
                          className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.mailingAddressLine2}
                        />
                        <ErrorMessage component="p" name="mailingAddressLine2" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="mailingAddressCity" className="block text-sm font-medium leading-6 text-gray-900">
                          Mailing City
                        </label>
                        <Field
                          type="text"
                          name="mailingAddressCity"
                          id="mailingAddressCity"
                          autoComplete="family-name"
                          className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.mailingAddressCity}
                        />
                        <ErrorMessage component="p" name="mailingAddressCity" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="mailingAddressState" className="block text-sm font-medium leading-6 text-gray-900">
                          Mailing State / Province
                        </label>
                        <Field
                          type="text"
                          name="mailingAddressState"
                          id="mailingAddressState"
                          autoComplete="family-name"
                          className="block mt-2  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.mailingAddressState}
                        />
                        <ErrorMessage component="p" name="mailingAddressState" className="mt-2 text-sm text-red-600" />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="mailingAddressPostalCode" className="block text-sm font-medium leading-6 text-gray-900">
                          Mailing ZIP / Postal code
                        </label>
                        <Field
                          type="text"
                          name="mailingAddressPostalCode"
                          id="mailingAddressPostalCode"
                          autoComplete="family-name"
                          className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={values.mailingAddressPostalCode}
                        />
                        <ErrorMessage component="p" name="mailingAddressPostalCode" className="mt-2 text-sm text-red-600" />
                      </div>

                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      navigate("/provider/patients");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={!(isValid && dirty)}
                  >
                    {loadingActions.includes("PROVIDER_UPDATE_PATIENT_ACTION") && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </section>
        )}
      </Formik >
    </>
  );
}