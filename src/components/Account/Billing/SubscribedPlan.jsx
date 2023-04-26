import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams, Routes, Route } from 'react-router-dom';

import { cancelSubscription, getSubscription } from '../../../../redux/billing/actions';
import ManagePlan from './ManagePlan';

export default function SubscribedPlan() {
  const dispatch = useDispatch();
  const [showManagePlan, setShowManagePlan] = useState(false);
  const subscription = useSelector((state) => state.billing.subscription);

  useEffect(() => {
    // We do this because of async callout
    let mounted = true;

    dispatch(getSubscription());

    return () => (mounted = false);
  }, []);

  const handleClose = () => {
    setShowManagePlan(false);
  };

  if (showManagePlan) {
    // console.log(">>>result=");
    // console.log(result);
    // console.log("stripePriceId=" + stripePriceId);
    return (
      <ManagePlan
        handleClose={() => handleClose()}
      />
    );
  }

  return (
    <>
      <section aria-labelledby="plan-heading" className="mt-5">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div>
              <h2 id="plan-heading" className="inline text-lg font-medium leading-6 text-gray-900">
                Plan
              </h2>
              {subscription && subscription.current_period_end &&
                <div className="inline-flex float-right py-2 px-4 shadow-md no-underline rounded-full bg-blue text-white font-sans font-semibold text-sm bg-indigo-600 hover:text-white focus:outline-none active:shadow-none mr-2">
                  Next Renewal
                  <div className="ml-2">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "2-digit",
                      timeZone: "America/Chicago"
                    }).format(new Date(subscription.current_period_end))}
                  </div>
                </div>
              }
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="mt-1">
                  <a href="#" className="inline-flex block text-center text-base text-sm font-medium text-indigo-600"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowManagePlan(true);
                    }}
                  >
                    Manage Subscription
                    <div className="mx-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}