import { RefreshIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { dataExport, dataExportDownload } from "../../redux/provider/actions";
import { getUser } from "../../redux/user/actions";

export default function DataExport() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Data Export</h1>
            <p className="mt-2 text-sm text-gray-700">
              Export a CSV file
            </p>
          </div>
        </div>
        <Formik
          initialValues={{
            patientId: "",
          }}
          validationSchema={Yup.object().shape({
            patientId: Yup.string(),
          })}
          onSubmit={async (values, { setStatus, resetForm, setSubmitting }) => {

          }}
        >
          {({ values, errors, touched, isSubmitting, status, resetForm, setFieldValue }) => (
            <section aria-labelledby="billing-history-heading" className="mt-5">
              <Form className="">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="bg-white py-6 px-4 sm:p-6 flex flex-row items-center">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Blood Pressure</h3>
                    </div>
                    <div className="ml-3 flex">
                      <button
                        type="button"
                        className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => {
                          dispatch(dataExport({ userId: auth.user.id }));
                        }}
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            </section>
          )}
        </Formik>
      </div >
      <div className="pb-6 px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="" className="mt-5">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div className="flex flex-row items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Download</h3>
                </div>
                <button className="ml-3 inline-flex items-center bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => {
                    dispatch(getUser(auth.user.id));
                  }}>
                  Refresh <RefreshIcon className="h-6 w-6 " />
                </button>
              </div>
              <div className="mt-5">
                {auth.user.attributes.csv_exports.map((csv, index) => {
                  if (csv.url) {
                    return (
                      <div key={index} className="mt-3 flex">{format(new Date(csv.created_at), 'M/d/yyyy h:mm a')} - <button className="ml-1 inline-block align-baseline outline-none bg-transparent text-sm font-bold text-indigo-500 focus:outline-none" onClick={() => {
                        dispatch(dataExportDownload(`${csv.id}`))
                          .then((response) => {
                            if (response.data?.data?.attributes?.data?.url)
                              window.location.href = `${process.env.REACT_APP_BACKEND_API_URL}` + response.data?.data?.attributes?.data?.url;
                          })
                          .catch((error) => {
                            console.log(">>>error");
                            console.log(error);
                          });
                      }}>Download</button></div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}