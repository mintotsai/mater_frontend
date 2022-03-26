import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from "../../../redux/user/actions";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Notifications from '../../Common/Notifications';
import toast, { Toaster } from "react-hot-toast";

import NameChange from './NameChange'
import EmailChange from './EmailChange'
import PasswordChange from './PasswordChange'
import TwoFactorEnable from './TwoFactorEnable'

import { CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon, ShieldCheckIcon } from '@heroicons/react/solid'

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
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("#");
  useEffect(() => {
    navigate("#");
  }, []);

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
              </>}
          </div>
        </div>
      </div>
    </main>
  );
}