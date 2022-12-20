import { Fragment, useRef, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { CalendarIcon, CheckIcon, PlusIcon, UsersIcon, ViewBoardsIcon, ViewListIcon } from '@heroicons/react/outline'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createSubscription } from "../../../../redux/billing/actions";
import { useSelector, useDispatch } from "react-redux";
import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "../../../../redux/system/actions"

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);

const features = [
  {
    name: 'List view',
    icon: ViewListIcon,
    description:
      'Nunc a, lacinia sed risus neque, arcu, rhoncus. Id mauris justo facilisis aliquam platea vestibulum condimentum morbi.',
  },
  {
    name: 'Boards',
    icon: ViewBoardsIcon,
    description:
      'Purus lobortis volutpat posuere id integer nunc tellus. Non mauris malesuada feugiat massa mi pellentesque cum est. Pharetra a varius urna rhoncus, tempor rutrum.',
  },
  {
    name: 'Calendar',
    icon: CalendarIcon,
    description:
      'Purus lobortis volutpat posuere id integer nunc tellus. Non mauris malesuada feugiat massa mi pellentesque cum est. Pharetra a varius urna rhoncus, tempor rutrum.',
  },
  {
    name: 'Teams',
    icon: UsersIcon,
    description:
      'Tincidunt sollicitudin interdum nunc sit risus at bibendum vitae. Urna, quam ut sit justo non, consectetur et varius.',
  },
]
const checklist = [
  'Unlimited projects',
  'No per user fees',
  'Unlimited storage',
  '24/7 support',
  'Cancel any time',
  '14 days free',
]

export default function Checkout({ tierChosen, plan, handleClose }) {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

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
      // window.location.href = system.gotoUrl;
      handleClose();
      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: ""
      })
    }
  }, [system.gotoUrl]);

  const appearance = {
    theme: 'stripe',

  };
  const options = {
    hidePostalCode: true,
    appearance,
  };

  return (
    <>
      <div className="min-h-full flex fixed w-full h-full top-0 left-0 z-50 bg-white">
        <div className="flex flex-1 justify-center ">
          <div className="bg-white py-16 px-4 sm:py-24 sm:px-6 lg:px-0 lg:pr-8 m-auto">
            <div className="max-w-lg mx-auto lg:mx-0">
              <h2 className="text-base font-semibold tracking-wide text-indigo-600 uppercase">Full-featured - Tier: {tierChosen}</h2>
              <p className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Everything you need to talk with your customers
              </p>
              <dl className="mt-12 space-y-10">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute h-12 w-12 flex items-center justify-center bg-indigo-500 rounded-md">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center bg-indigo-700">
          <div className="max-w-lg py-16 px-4 mx-auto lg:px-8 m-auto">
            <Formik
              // Must have initialValue or the onSubmit doesn't work
              initialValues={{}}
              // validationSchema={{}}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // resetForm();

                if (elements == null) {
                  return;
                }

                const cardElement = elements.getElement(CardElement);

                const { error, paymentMethod } = await stripe.createPaymentMethod({
                  type: 'card',
                  card: cardElement,
                });

                if (error) {
                  console.log('[error]', error);
                } else {
                  dispatch(createSubscription({ payment_method_token: paymentMethod.id, plan: plan }));
                }
              }}
            >
              {({ values, errors, touched, isSubmitting, status, resetForm, stripe, elements }) => (
                <Form className="grid grid-cols-6 gap-4">
                  <div className="col-span-3">
                    <label className="block mb-1 text-sm text-white" htmlFor="first_name">
                      First Name
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="frst_name"
                    />
                  </div>

                  <div className="col-span-3">
                    <label className="block mb-1 text-sm text-white" htmlFor="last_name">
                      Last Name
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="last_name"
                    />
                  </div>

                  <div className="col-span-6">
                    <label className="block mb-1 text-sm text-white" htmlFor="email">
                      Email
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="email"
                      id="email"
                    />
                  </div>

                  <div className="col-span-6">
                    <label className="block mb-1 text-sm text-white" htmlFor="phone">
                      Phone
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="tel"
                      id="phone"
                    />
                  </div>

                  <div className="col-span-6">
                    <label className="block mb-1 text-sm text-white" htmlFor="postal-code">
                      ZIP/Post Code
                    </label>

                    <input
                      className="rounded-lg shadow-sm border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      placeholder="ZIP/Post Code"
                    />
                  </div>

                  <fieldset className="col-span-6">
                    <legend className="block mb-1 text-sm text-white">
                      Card Details
                    </legend>

                    <div className="-space-y-px bg-white rounded-lg shadow-sm">
                      <div>
                        <label className="sr-only" htmlFor="card-number">Card Number</label>
                        <CardElement className="border-gray-200 relative rounded-br-lg w-full focus:z-10 text-sm p-2.5 placeholder-gray-400" options={options} />
                      </div>
                    </div>
                  </fieldset>

                  <div className="col-span-6">
                    <button
                      className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                      type="submit"
                    >
                      Pay Now
                    </button>
                    <a href="#" className="mt-5 block text-center text-base text-sm font-medium text-indigo-200 hover:text-white"
                      onClick={() => { handleClose() }}
                    >
                      Cancel
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}