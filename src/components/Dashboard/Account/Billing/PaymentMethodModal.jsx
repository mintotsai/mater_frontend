import { Dialog, Transition } from '@headlessui/react';
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Form, Formik } from 'formik';
import { Fragment, useRef } from 'react';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);

export default function PaymentMethodModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null)
  const stripe = useStripe();
  const elements = useElements();
  const auth = useSelector((state) => state.auth);

  const appearance = {
    theme: 'stripe',

  };

  const options = {
    terms: { card: "never" },
    fields: { billingDetails: 'never' },
    // appearance,
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => handleClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Formik
              // Must have initialValue or the onSubmit doesn't work
              initialValues={{}}
              // validationSchema={{}}
              onSubmit={async (values, { setStatus, resetForm }) => {
                // resetForm();

                if (!stripe || !elements) {
                  return;
                }

                // TODO: is window.location.origin the best?
                // TODO: How to get country?
                // https://support.stripe.com/questions/update-card-details-with-a-setupintent
                // http://localhost:3000/settings/account?setup_intent=seti_1MD8ooJWybDt9PDNnIqqOFwo&setup_intent_client_secret=seti_1MD8ooJWybDt9PDNnIqqOFwo_secret_Mx2unRjF7awDM7GGEE2M66DNK4KRnVy&redirect_status=succeeded
                const { error, setupDetails } = await stripe.confirmSetup({
                  elements,
                  confirmParams: {
                    return_url: window.location.origin + "/settings/account#billing",
                    payment_method_data: {
                      billing_details: {
                        name: auth.user.attributes.first_name + " " + auth.user.attributes.last_name,
                        email: auth.user.attributes.email,
                        phone: "",
                        address: {
                          country: "US",
                          postal_code: "",
                          state: "",
                          city: "",
                          line1: "",
                          line2: "",
                        }
                      }
                    }
                  }
                });

                if (error) {
                  console.log('[error]', error);
                  toast.error(error.message);
                } else {
                }
              }}
            >
              {({ values, errors, touched, isSubmitting, status, resetForm, stripe, elements }) => (
                <Form>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                      <div>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Payment Information</h3>
                        {/* <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can recieve mail.</p> */}
                      </div>
                      <div className="grid grid-cols-6 gap-6 mt-5">
                        <div className="col-span-6 sm:col-span-6">
                          <PaymentElement options={options} />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6 mt-5">
                        <div className="col-span-6 sm:col-span-3">
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <div className="grid grid-cols-6 gap-1">
                            <div className="col-span-2">
                            </div>
                            <div className="col-span-2">
                              <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-sm font-medium text-gray-500 shadow-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                onClick={() => handleClose()}
                                ref={cancelButtonRef}
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="col-span-2">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
