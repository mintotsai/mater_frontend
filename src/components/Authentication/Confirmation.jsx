import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import authenticationApi from '../../apis/authentication';

const Confirmation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isSuccess, setIsSuccess] = useState();

  useEffect(() => {
    console.log("useEffect: mount");
    document.documentElement.classList.remove("bg-gray-50");
    const confirmationToken = searchParams.get("confirmation_token");
    // console.log(">>>confirmation_token: " + confirmationToken);
    const fetchData = async () => {
      // get the data from the api
      try {
        const response = await authenticationApi.confirmation({ params: { confirmation_token: confirmationToken } });
        // console.log(">>>response");
        // console.log(response);
        if (response.data.error != null) {

          // TODO: Show error screen
          // setIsSuccess(false);
        } else {
          // TODO: Successful confirmation Message?
          window.location.href = "/login";
          // setIsSuccess(true);
        }
      } catch (error) {
        console.log(">>>error2");
        console.log(error);
      }

      return () => {
        console.log("useEffect: unmount");
        document.documentElement.classList.add("bg-gray-50");
      }
    }

    fetchData();

  }, [])

  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            {/* <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">404</p> */}
            <div className="sm:ml-6">
              <div className="sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Confirmation code is invalid or email has already been verified.</h1>
                <p className="mt-1 text-base text-gray-500">Please contact us if this was in error.</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <a
                  href="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Go back home
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact support
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Confirmation;