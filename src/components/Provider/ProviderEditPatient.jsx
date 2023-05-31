import { CalendarIcon, ClipboardCheckIcon, HeartIcon, UserIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROLES } from "../../helpers/roles";
import { useHasRole } from '../../hooks/useHasRole';
import { getPatient } from '../../redux/provider/actions';
import EditPersonalInfo from "./Patient/EditPersonalInfo";
import PatientMedicationList from './Patient/Medication/PatientMedicationList';
import PatientBloodPressureTable from "./Patient/PatientBloodPressureTable";
import PatientEvents from './Patient/PatientEvents';
import PatientProfilePictureChange from "./Patient/PatientProfilePictureChange";

const tabs = [
  { name: 'Blood Pressure', href: '#', icon: HeartIcon, current: true },
  { name: 'Events', href: '#events', icon: CalendarIcon, current: false },
  { name: 'Medication', href: '#medication', icon: ClipboardCheckIcon, current: false },
  { name: 'Profile', href: '#profile', icon: UserIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProviderEditPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isProvider = useHasRole(ROLES.provider);
  const loadingActions = useSelector((state) => state.system.loadingActions);
  const [activeTab, setActiveTab] = useState("#");
  const location = useLocation();

  useEffect(() => {
    if (isProvider) {
      dispatch(getPatient(id))
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }, [isProvider]);

  useEffect(() => {
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
            {loadingActions.includes("PROVIDER_GET_PATIENT_ACTION") ? <></> :
              <>
                <div>
                  {activeTab == "#" &&
                    <>
                      <PatientBloodPressureTable />
                    </>}
                  {activeTab == "#events" &&
                    <>
                      <PatientEvents />
                    </>
                  }
                  {activeTab == "#medication" &&
                    <>
                      <PatientMedicationList />
                    </>
                  }
                  {activeTab == "#profile" &&
                    <>
                      <PatientProfilePictureChange />
                      <EditPersonalInfo />
                    </>}
                </div>
              </>
            }
          </div>
        </div>
      </main>
    </>
  );
}