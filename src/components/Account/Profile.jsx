import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';


import { CreditCardIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/solid';
import { createPresignedUrl } from "../../redux/user/actions";
import ProfilePictureChange from '../Common/ProfilePictureChange';
import PlanSection from './Billing/PlanSection';
import EmailChange from './EmailChange';
import NameChange from './NameChange';
import PasswordChange from './PasswordChange';
import TwoFactorEnable from './TwoFactorEnable';

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
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("#");
  useEffect(() => {
    setIsLoading(false);
    const href = location.hash;
    if (href) {
      tabs.map((tab) => {
        if (tab.href == href) {
          tab.current = true;
        } else {
          tab.current = false;
        }
      });
      setActiveTab(href);
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
                  {Object.keys(auth.user).length !== 0 && (
                    <ProfilePictureChange
                      selectedUser={auth.user}
                      callDispatch={(file, payload, navigate) => {
                        dispatch(createPresignedUrl(file, payload, navigate));
                      }
                      } />
                  )}
                  <NameChange />
                  <EmailChange />
                </>}
              {activeTab == "#security" &&
                <>
                  <PasswordChange />
                  <TwoFactorEnable />
                </>}
              {activeTab == "#billing" && !isLoading &&
                <>
                  <PlanSection />
                </>}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}