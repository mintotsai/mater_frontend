import { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import PaymentMethodModal from './PaymentMethodModal'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getCreditCardInfo, getSetupSecret } from "../../../../redux/billing/actions";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUB_KEY}`);

export default function PaymentMethods() {
  const dispatch = useDispatch();
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);
  const cardInfo = useSelector((state) => state.billing.cardInfo);
  const setupSecret = useSelector((state) => state.billing.setupSecret);

  const options = {
    // passing the client secret obtained in step 3
    clientSecret: setupSecret,
    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",

    },
  };

  let last4 = "••••";
  if (cardInfo.card) {
    last4 = cardInfo.card.last4;
  }

  const handleClose = () => {
    setPaymentMethodModalOpen(false);
  };

  useEffect(() => {
    console.log("useEffect: mount");

    const fetchData = async () => {
      // get the data from the api
      dispatch(getCreditCardInfo());
      // dispatch(getSetupSecret());

      return () => {
        console.log("useEffect: unmount");
      }
    }

    fetchData();

  }, []);

  return (
    <>
      <section aria-labelledby="payment-details-heading" className="mt-5">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                Payment Methods
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Update your billing information. Please note that updating your location could affect your tax
                rates.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-6">
              <div className="col-span-4 sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  Card on File
                </label>
                <input
                  type="text"
                  name="credit-card"
                  id="credit-card"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="•••• •••• •••• 1234"
                  value={"•••• •••• •••• " + last4}
                  disabled="disabled"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setPaymentMethodModalOpen(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
      <Elements stripe={stripePromise} options={options}>
        <PaymentMethodModal open={paymentMethodModalOpen} handleClose={() => handleClose()} />
      </Elements>
    </>
  )
}