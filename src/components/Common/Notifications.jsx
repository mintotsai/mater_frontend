/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import toast, { Toaster, resolveValue } from "react-hot-toast";

export default function Notifications() {
  const [show, setShow] = useState(true)

  return (
    <Toaster position="top-right" reverseOrder={false}>
      {(t) => (
        <>
          <Transition
            show={t.visible} // {show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {t.type == "success" ? <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" /> : <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-500">{resolveValue(t.message, t)}</p>
                    {/* <p className="mt-1 text-sm text-gray-500">{resolveValue(t.message, t)}</p> */}
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        //setShow(false);
                        toast.dismiss(t.id);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </>
      )}
    </Toaster>
  );
}