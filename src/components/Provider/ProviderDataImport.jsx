import CryptoJS from 'crypto-js';
import { ErrorMessage, Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';
import { uploadCSV } from "../../redux/provider/actions";

export default function DataImport() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const providerAllPatients = useSelector((state) => state.providerUser.providerAllPatients)

  const inputFile = useRef(null);

  let options = [];
  if (providerAllPatients) {
    options = providerAllPatients.map(patient => {
      return {
        value: patient.id,
        label: patient.attributes.user_profile_first_name + " " + patient.attributes.user_profile_last_name
      };
    });
  } else {
    providerAllPatients = [];
  }

  const ValueChangeListener = () => {
    const { submitForm, values, initialValues } = useFormikContext();
    const { file } = values;

    useEffect(() => {
      if (file != initialValues.file) {
        submitForm();
      }
    }, [file]);

    return null;
  };

  const md5FromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (fileEvent) => {
        let binary = CryptoJS.lib.WordArray.create(fileEvent.target.result)
        const md5 = CryptoJS.MD5(binary)
        resolve(md5)
      }
      reader.onerror = () => {
        reject('oops, something went wrong with the file reader.')
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const fileChecksum = async (file) => {
    const md5 = await md5FromFile(file)
    const checksum = md5.toString(CryptoJS.enc.Base64)
    return checksum
  }

  return (
    <>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Data import</h1>
            <p className="mt-2 text-sm text-gray-700">
              Import a CSV file
            </p>
          </div>
        </div>
        <Formik
          initialValues={{
            file: null,
            patientId: "",
          }}
          validationSchema={Yup.object().shape({
            patientId: Yup.string(),
          })}
          onSubmit={async (values, { setStatus, resetForm, setSubmitting }) => {
            resetForm();

            let patientId = values["patientId"];

            const file = values.file;
            if (file) {
              const checksum = await fileChecksum(file)
              let payload = {
                patientId: patientId,
                file: {
                  filename: file.name,
                  byte_size: file.size,
                  checksum: checksum,
                  content_type: 'text/csv',
                  metadata: {
                    'message': 'csv file'
                  }
                }
              };

              dispatch(uploadCSV(file, payload));
            }
          }}
        >
          {({ values, errors, touched, isSubmitting, status, resetForm, setFieldValue }) => (
            <section aria-labelledby="billing-history-heading" className="mt-5">
              <Form className="">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="bg-white py-6 px-4 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Blood Pressure</h3>
                    </div>
                    <div className="mt-6 grid grid-cols-1">
                      <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      {/* https://chat.openai.com/c/6f44bd71-9798-4cc6-bbcf-88b6cc42cfd5 */}
                      <CreatableSelect
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(x) => {
                          setFieldValue("patientId", x.value);
                        }}
                        options={options}
                      />
                      <ErrorMessage component="p" name="patientName" className="mt-2 text-sm text-red-600" />
                    </div>
                    <div className="mt-3 flex">
                      <button
                        type="button"
                        className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => {
                          inputFile.current.click();
                        }}
                      >
                        Import
                      </button>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        ref={inputFile}
                        onChange={(e) => {
                          e.preventDefault();
                          const reader = new FileReader();
                          const file = e.target.files[0];
                          reader.onloadend = () => {
                            setFieldValue("file", file);
                          }
                          reader.readAsDataURL(file);
                        }}
                        className="hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      />
                      <ValueChangeListener />
                    </div>
                  </div>
                </div>
              </Form>
            </section>
          )}
        </Formik>
      </div >
    </>
  );
}