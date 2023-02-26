/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter, useNavigate, useLocation, useSearchParams, UNSAFE_NavigationContext } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline'
// import { XIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  XIcon,
} from '@heroicons/react/outline'

import actionCable from "actioncable";
const CableApp = {}

export default function BellNotification() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [show, setShow] = useState(false)
  const [open, setOpen] = useState(true)
  let [isOpen, setIsOpen] = useState(true)

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    // https://stackoverflow.com/a/36534210/1391412
    // https://itnext.io/actioncable-authentication-in-a-token-based-rails-api-f9cc4b8bf560
    CableApp.cable = actionCable.createConsumer(`${process.env.REACT_APP_BACKEND_ACTIONCABLE_URL}?token=` + authToken);
    // console.log("MONITOR", actionCable.startDebugging());
    CableApp.user = CableApp.cable.subscriptions.create({
      channel: "NotificationsChannel",
      id: auth.user.id
    }, {
      initialized: () => {
        console.log('useChannel - INFO: Init actioncable');
      },
      connected: () => {
        console.log('useChannel - INFO: Connected to actioncable');
      },
      received: (data) => {
        console.log("useChannel - INFO: Received from actioncable");
        // console.log(data);
        if (data.show) {
          setShow(true);
        }
      },
      disconnected: () => {
        console.log('useChannel - INFO: Disconnected');
      }
    });
    // These work
    // CableApp.user.perform('appear', { data: "test" });
    // CableApp.user.send({ message: "hello?" });

    return function cleanup() {
      console.log("useChannel - INFO: Cleanup");
      CableApp.user.unsubscribe();
    };
  }, []);

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
      <button className="inline-block relative" onClick={() => { navigate("/notifications"); setShow(false); }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {show && <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>}
      </button>
    </>
  );
}