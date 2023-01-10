import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes, BrowserRouter, useNavigate, useLocation, useSearchParams, UNSAFE_NavigationContext } from 'react-router-dom';
import { Disclosure, Menu, RadioGroup, Switch, Transition } from '@headlessui/react'

import { cancelSubscription, getSubscription, updateSubscription } from '../../../../redux/billing/actions';
import { plans, getPlanFromStripePriceId, getStripePriceIdFromPlan } from '../../../../helpers/billings.helper';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PlanSection() {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(plans[1])
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true)
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const subscription = useSelector((state) => state.billing.subscription);

  useEffect(() => {
    // We do this because of async callout
    let mounted = true;

    dispatch(getSubscription())
      .then(() => {

      });

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (subscription) {
      if (subscription.interval == "month") {
        setAnnualBillingEnabled(false);
      } else {
        setAnnualBillingEnabled(true);
      }

      var currentPlan = getPlanFromStripePriceId(subscription.plan_id)
      setSelectedPlan(plans[currentPlan]);
    }
  }, [subscription])

  return (
    <>
      {/* Plan */}
      <section aria-labelledby="plan-heading" className="mt-5">
        <form action="#" method="POST">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
              <div>
                <h2 id="plan-heading" className="inline text-lg font-medium leading-6 text-gray-900">
                  Plan
                </h2>
                {subscription && !subscription.cancel_at_period_end && subscription.current_period_end &&
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

              <RadioGroup value={selectedPlan} onChange={(e) => {
                setSelectedPlan(e);
                setEnableSaveButton(true);
              }}
              >
                <RadioGroup.Label className="sr-only"> Pricing plans </RadioGroup.Label>
                <div className="relative -space-y-px rounded-md bg-white">
                  {plans.map((plan, planIdx) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan}
                      className={({ checked }) =>
                        classNames(
                          planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                          planIdx === plans.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                          checked ? 'bg-indigo-50 border-indigo-200 z-10' : 'border-gray-200',
                          'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <span className="flex items-center text-sm">
                            <span
                              className={classNames(
                                checked ? 'bg-indigo-500 border-transparent' : 'bg-white border-gray-300',
                                active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
                                'h-4 w-4 rounded-full border flex items-center justify-center'
                              )}
                              aria-hidden="true"
                            >
                              <span className="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <RadioGroup.Label as="span" className="ml-3 font-medium text-gray-900">
                              {plan.name}
                            </RadioGroup.Label>
                          </span>
                          <RadioGroup.Description
                            as="span"
                            className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                          >
                            <span
                              className={classNames(
                                checked ? 'text-indigo-900' : 'text-gray-900',
                                'font-medium'
                              )}
                            >
                              ${plan.priceMonthly} / mo
                            </span>{' '}
                            <span className={checked ? 'text-indigo-700' : 'text-gray-500'}>
                              (${plan.priceYearly} / yr)
                            </span>
                          </RadioGroup.Description>
                          <RadioGroup.Description
                            as="span"
                            className={classNames(
                              checked ? 'text-indigo-700' : 'text-gray-500',
                              'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                            )}
                          >
                            {plan.limit}
                          </RadioGroup.Description>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <Switch.Group as="div" className="flex items-center">
                <Switch
                  checked={annualBillingEnabled}
                  onChange={(e) => {
                    setAnnualBillingEnabled(e);
                    setEnableSaveButton(true);
                  }}
                  className={classNames(
                    annualBillingEnabled ? 'bg-indigo-500' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3">
                  <span className="text-sm font-medium text-gray-900">Annual billing</span>
                  <span className="text-sm text-gray-500">(Save 10%)</span>
                </Switch.Label>
              </Switch.Group>
            </div>
            <div className="flex justify-end bg-gray-50 px-4 py-3 text-right sm:px-6">
              {subscription && !subscription.cancel_at_period_end &&
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(cancelSubscription());
                  }}
                  disabled={subscription && subscription.cancel_at_period_end}
                >
                  I'm sure I want to cancel.
                </button>
              }
              <button
                type="submit"
                className="inline-flex ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => {
                  e.preventDefault();

                  var stripePriceId = getStripePriceIdFromPlan(selectedPlan.name, annualBillingEnabled);

                  setShowSpinner(true);
                  dispatch(updateSubscription({ stripe_price_id: stripePriceId }))
                    .then((response) => {
                      setShowSpinner(false);
                    })
                    .catch((error) => {
                      setShowSpinner(false);
                    });
                }}
                disabled={!enableSaveButton}
              >
                {showSpinner && <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
                Save
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}