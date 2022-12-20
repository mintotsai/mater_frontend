import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams, Routes, Route } from 'react-router-dom';
import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "../../../../redux/system/actions"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Checkout from './Checkout';
import { CheckIcon } from '@heroicons/react/solid'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";

const tiers = [
  {
    name: 'Hobby',
    stripePriceId: 'price_1LIxEgJWybDt9PDNgavgGmdA',
    price: 12,
    billingCycle: 'Monthly',
    description: 'All the basics for starting a new business',
    includedFeatures: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.'],
  },
  {
    name: 'Hobby',
    stripePriceId: '',
    price: 24,
    billingCycle: 'Yearly',
    description: 'All the basics for starting a new business',
    includedFeatures: ['Potenti felis, in cras at at ligula nunc.', 'Orci neque eget pellentesque.'],
  },
  {
    name: 'Startup',
    stripePricingId: '',
    price: 32,
    billingCycle: 'Monthly',
    description: 'All the basics for starting a new business',
    includedFeatures: [
      'Potenti felis, in cras at at ligula nunc. ',
      'Orci neque eget pellentesque.',
      'Donec mauris sit in eu tincidunt etiam.',
      'Faucibus volutpat magna.',
    ],
  },
  {
    name: 'Startup',
    stripePricingId: '',
    price: 64,
    billingCycle: 'Yearly',
    description: 'All the basics for starting a new business',
    includedFeatures: [
      'Potenti felis, in cras at at ligula nunc. ',
      'Orci neque eget pellentesque.',
      'Donec mauris sit in eu tincidunt etiam.',
      'Faucibus volutpat magna.',
    ],
  },
  {
    name: 'Enterprise',
    stripePriceId: '',
    price: -1,
    billingCycle: 'MonthlyYearly',
    description: 'All the basics for starting a new business',
    includedFeatures: [
      'Potenti felis, in cras at at ligula nunc. ',
      'Orci neque eget pellentesque.',
      'Donec mauris sit in eu tincidunt etiam.',
      'Faucibus volutpat magna.',
      'Id sed tellus in varius quisque.',
      'Risus egestas faucibus.',
      'Risus cursus ullamcorper.',
    ],
  },
]

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);

// https://github.com/jaredpalmer/formik/issues/612
// https://codesandbox.io/s/4vxyl?file=/src/App.tsx:1230-1242
export default function Plans() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);
  let navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [tierChosen, setTierChosen] = useState("");
  const [billingCycle, setBillingCycle] = useState("Monthly");

  useEffect(() => {
    // We do this because of async callout
    let mounted = true;

    // Put something here...

    return () => (mounted = false);
  }, []);

  // TODO: Should this be in index.jsx
  useEffect(() => {
    if (system.gotoUrl) {
      // navigate(system.gotoUrl, { replace: true });
      window.location.href = system.gotoUrl;
      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: ""
      })
    }
  }, [system.gotoUrl]);

  const handleClose = () => {
    setShowCheckout(false);
  };

  if (showCheckout) {
    var result = tiers.filter(tier => { return tier.name === tierChosen });
    // console.log(">>>result=");
    // console.log(result);
    var stripePriceId = result[0].stripePriceId;
    // console.log("stripePriceId=" + stripePriceId);
    return (
      <Elements stripe={stripePromise}>
        <Checkout
          open={showCheckout}
          tierChosen={tierChosen}
          plan={stripePriceId}
          // handleLogout={() => handleLogout()}
          handleClose={() => handleClose()}
        />
      </Elements>
    );
  }

  return (
    <>
      <div className="py-4">
        <Formik
          initialValues={{
            // [tiers]: tiers
          }}
          onSubmit={async (values, { setStatus, resetForm }) => {
            // console.log(">>>tierChosen=" + tierChosen);
            // console.log(">>>values=");
            // console.log(values);
            var result = tiers.filter(tier => { return tier.name === tierChosen });
            // console.log(">>>result=");
            // console.log(result);
            var stripePriceId = result[0].stripePriceId;
            // console.log("stripePriceId=" + stripePriceId);
          }}
        >
          {({ values, errors, touched, isSubmitting, status, resetForm, handleSubmit }) => (
            <Form className="space-y-8 divide-y divide-gray-200">
              <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                  <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
                  <p className="mt-5 text-xl text-gray-500 sm:text-center">
                    Start building for free, then add a site plan to go live. Account plans unlock additional features.
                  </p>
                  <div className="relative self-center mt-6 bg-gray-100 rounded-lg p-0.5 flex sm:mt-8">
                    <button
                      type="button"
                      className={billingCycle == "Monthly" ? "relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8" : "relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"}
                      onClick={() => setBillingCycle("Monthly")}
                    >
                      Monthly billing
                    </button>
                    <button
                      type="button"
                      className={billingCycle == "Yearly" ? "ml-0.5 relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8" : "ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8"}
                      onClick={() => setBillingCycle("Yearly")}
                    >
                      Yearly billing
                    </button>
                  </div>
                </div>
                <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                  {tiers.map((tier) => {
                    if (tier.billingCycle == billingCycle || tier.billingCycle == "MonthlyYearly") {
                      return (<div key={tier.name} className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                        <div className="p-6">
                          <h2 className="text-lg leading-6 font-medium text-gray-900">{tier.name}</h2>
                          <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                          {tier.price != -1 ? <p className="mt-8">
                            <span className="text-4xl font-extrabold text-gray-900">${tier.price}</span>
                            <span className="text-base font-medium text-gray-500">/mo</span>
                          </p> : ""}
                          <Field type="hidden" name="lookup_key" value={tier.stripePriceId} />
                          <button
                            className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                            onClick={(e) => {
                              e.preventDefault();
                              setTierChosen(tier.name);
                              setShowCheckout(true);
                            }}
                          >
                            {tier.price != -1 ? "Buy " + tier.name : "Call"}
                          </button>
                        </div>
                        <div className="pt-6 pb-8 px-6">
                          <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                          <ul role="list" className="mt-6 space-y-4">
                            {tier.includedFeatures.map((feature) => (
                              <li key={feature} className="flex space-x-3">
                                <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                <span className="text-sm text-gray-500">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>);
                    }
                  })}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

