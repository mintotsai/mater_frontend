import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { confirmation } from "../../redux/auth/actions";

const Confirmation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect: mount");
    document.documentElement.classList.remove("bg-gray-50");
    const confirmationToken = searchParams.get("confirmation_token");
    const fetchData = async () => {
      // get the data from the api
      dispatch(confirmation({ params: { confirmation_token: confirmationToken } }))
        .then(() => {
          window.location.href = "/login";
        })
        .catch(() => {
          // TODO: Hide then show error page below?
        });

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
                {/* TODO: Change email address */}
                <a
                  href="mailto:contact@jasminepm.com"
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