import CryptoJS from 'crypto-js';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePictureChange({ selectedUser, callDispatch }) {
  let navigate = useNavigate();

  const inputFile = useRef(null);

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
      <Formik
        initialValues={{
          file: null
        }}
        onSubmit={async (values, { setStatus, resetForm, setSubmitting }) => {
          resetForm();

          const file = values.file;
          if (file) {
            const checksum = await fileChecksum(file)
            let payload = {
              file: {
                filename: file.name,
                byte_size: file.size,
                checksum: checksum,
                content_type: 'image/png',
                metadata: {
                  'message': 'profile image'
                }
              }
            };

            callDispatch(file, payload, navigate);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting, status, resetForm, setFieldValue }) => (
          <section aria-labelledby="billing-history-heading" className="mt-5">
            <Form className="">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Photo</h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-6">
                    <div className="mt-1 flex items-center">
                      {selectedUser?.attributes?.profile_image_url !== "" && (
                        <span className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                          <img alt='user' src={selectedUser?.attributes?.profile_image_url?.includes("active_storage") ? `${process.env.REACT_APP_BACKEND_API_URL}${selectedUser?.attributes?.profile_image_url}` : `${selectedUser?.attributes?.profile_image_url}`} />
                        </span>
                      )}
                      {selectedUser.attributes.profile_image_url == '' && (
                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                      <button
                        type="button"
                        className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => {
                          inputFile.current.click();
                        }}
                      >
                        Change
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
                </div></div>
            </Form>
          </section>
        )}
      </Formik>
    </>
  );
}