/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
// import { XIcon } from '@heroicons/react/solid'
import toast, { Toaster, resolveValue } from "react-hot-toast";
import {
  BellIcon,
  XIcon,
} from '@heroicons/react/outline'

import actionCable from "actioncable";
const CableApp = {}
CableApp.cable = actionCable.createConsumer(`${process.env.REACT_APP_BACKEND_ACTIONCABLE_URL}`)

export default function BellNotification() {
  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(true)
  let [isOpen, setIsOpen] = useState(true)

  // TODO: Put this in redux?
  CableApp.user = CableApp.cable.subscriptions.create({
    channel: "NotificationsChannel",
    id: 35
  }, {
    received: (x) => {
      console.log("useChannel - INFO: Received from actioncable");
      // console.log(x);
      if (x.show) {
        setShow(true);
      }
    },
    initialized: () => {
      console.log('useChannel - INFO: Init actioncable');
    },
    connected: () => {
      console.log('useChannel - INFO: Connected to actioncable');
    },
    disconnected: () => {
      console.log('useChannel - INFO: Disconnected');
    }
  });

  return (
    <>
      {/*
        https://talltips.novate.co.uk/tailwind/swinging-bell-notification-icon
        https://gist.github.com/CodebyOmar/99b665424530fffc3ddaa98ede8c1322
        https://tailwindcomponents.com/component/tailwindcss-animated-ping-alert-bell
      */}
      {/* <button
        type="button"
        className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button> */}
      <button className="inline-block relative" onClick={() => { setShow(false); }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {show && <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>}
      </button>
    </>
  );
}