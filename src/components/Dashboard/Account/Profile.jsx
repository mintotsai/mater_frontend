import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter, useNavigate, useLocation, useSearchParams, UNSAFE_NavigationContext } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getUser, updateUser } from "../../../redux/user/actions";
import { setDefaultPaymentMethod, getSetupSecret } from "../../../redux/billing/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import toast, { Toaster } from "react-hot-toast";

import ProfilePictureChange from './ProfilePictureChange'
import NameChange from './NameChange'
import EmailChange from './EmailChange'
import PasswordChange from './PasswordChange'
import TwoFactorEnable from './TwoFactorEnable'
import Plans from './Billing/Plans'
import PaymentMethods from './Billing/PaymentMethods'
import BillingHistory from './Billing/BillingHistory'
import Checkout from './Billing/Checkout';
import { CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/solid'
import SubscribedPlan from './Billing/SubscribedPlan';

const tabs = [
  { name: 'My Account', href: '#', icon: UserIcon, current: true },
  { name: 'Security', href: '#security', icon: ShieldCheckIcon, current: false },
  { name: 'Plan & Billing', href: '#billing', icon: CreditCardIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);
  const history = createBrowserHistory();
  const setupSecret = useSelector((state) => state.billing.setupSecret);

  const [activeTab, setActiveTab] = useState("#");
  useEffect(() => {
    if (!setupSecret)
      dispatch(getSetupSecret());
    // console.log(">>>1searchParams=" + searchParams);
    // console.log(">>>1success=" + searchParams.get("success"));
    // navigate("#");
    const stripeRedirectStatus = searchParams.get("redirect_status");
    // console.log(">>>stripeRedirectStatus=" + stripeRedirectStatus);
    const href = location.hash;
    if (href) {
      // console.log(">>>1location.hash=" + location.hash);
      tabs.map((tab) => {
        if (tab.href == href) {
          tab.current = true;
        } else {
          tab.current = false;
        }
      });
      setActiveTab(href);
    }

    // https://stripe.com/docs/payments/save-and-reuse#confirm-the-setupintent
    switch (stripeRedirectStatus) {
      case 'succeeded':
        toast.success("Success! Your payment method has been saved.");
        const setupIntentId = searchParams.get("setup_intent");
        dispatch(setDefaultPaymentMethod({ setup_intent_id: setupIntentId }));
        // https://stackoverflow.com/questions/22753052/remove-url-parameters-without-refreshing-page
        window.history.pushState({}, document.title, "/" + "settings/account#billing");
        break;

      case 'processing':
        toast.success("Processing payment details. We'll update you when processing is complete.");
        window.history.pushState({}, document.title, "/" + "settings/account#billing");
        break;

      case 'requires_payment_method':
        // Redirect your user back to your payment page to attempt collecting
        // payment again
        toast.success("Failed to process payment details. Please try another payment method.");
        window.history.pushState({}, document.title, "/" + "settings/account#billing");
        break;
    }
  }, []);

  // https://stackoverflow.com/questions/71369320/how-to-controling-browser-back-button-with-react-router-dom-v6
  window.onpopstate = () => {
    // console.log("onpopstate");
    // console.log(">>>searchParams=" + searchParams);
    // console.log(">>>success=" + searchParams.get("success"));
    // console.log(history);
    // navigate("/");
    // navigate("#");
    const href = location.hash;
    if (href) {
      // console.log(">>>location.hash=" + location.hash);
      tabs.map((tab) => {
        if (tab.href == href) {
          tab.current = true;
        } else {
          tab.current = false;
        }
      });
      setActiveTab(href);
    } else {
      // Is this the best way?
      // console.log("location.pathname=" + location.pathname);
      // navigate(location.pathname);
      // window.location.reload(false);
      // this.props.history.goBack();
      // history.back();
      // history.goBack();
      // navigate(location.pathname, { replace: true });
      // navigate(-1);
      // window.location.href = location.pathname;
      // console.log(history);
      navigate(0);
    }
  }

  let handleChange = selectedOption => {
    const selectedHref = selectedOption.target.options[selectedOption.target.selectedIndex].value;
    tabs.map((tab) => {
      if (tab.href == selectedHref) {
        tab.current = true;
      } else {
        tab.current = false;
      }
    });
    setActiveTab(selectedHref);
  };

  let handleClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    tabs.map((tab) => {
      if (tab.href == href) {
        tab.current = true;
      } else {
        tab.current = false;
      }
    });
    setActiveTab(e.currentTarget.getAttribute("href"));
    navigate(e.currentTarget.getAttribute("href"))
  };

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Personal Settings</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div>
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                  defaultValue={tabs.find((tab) => tab.current).href}
                  onChange={handleChange}
                >
                  {tabs.map((tab) => (
                    <option key={tab.href} value={tab.href}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                        onClick={handleClick}
                      >
                        <tab.icon
                          className={classNames(
                            tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                            '-ml-0.5 mr-2 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                        <span>{tab.name}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            <div>
              {activeTab == "#" &&
                <>
                  <ProfilePictureChange />
                  <NameChange />
                  <EmailChange />
                </>}
              {activeTab == "#security" &&
                <>
                  <PasswordChange />
                  <TwoFactorEnable />
                </>}
              {activeTab == "#billing" &&
                <>
                  <SubscribedPlan />
                  <Plans />
                  <PaymentMethods />
                  <BillingHistory />
                </>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}