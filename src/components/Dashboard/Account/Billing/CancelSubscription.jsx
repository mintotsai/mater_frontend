import { Fragment, useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { cancelSubscription, getSubscription } from '../../../../redux/billing/actions';

export default function CancelSubscription() {
  const dispatch = useDispatch();
  const subscription = useSelector((state) => state.billing.subscription);

  return (
    <>
      <div className="py-4">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel Subscription</h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="mt-1">
                  Something not right? Want to keep using Loom but something is not working out for you?
                  <a href="#" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(">>>onClick");
                    }}>Contact us
                  </a>.
                </div>
              </div>
              <div className="sm:col-span-6">
                <div className="mt-1">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={(e) => {
                      dispatch(cancelSubscription());
                    }}
                    disabled={subscription && subscription.cancel_at_period_end}
                  >
                    I'm sure I want to cancel.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}