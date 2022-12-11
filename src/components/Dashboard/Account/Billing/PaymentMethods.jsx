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

  var last4 = "••••";
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
      <div className="py-4">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Methods</h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <div className="mt-1">
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
              <div className="sm:col-span-2">
                <div className="mt-1">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => { console.log(">>>onclick=" + paymentMethodModalOpen); setPaymentMethodModalOpen(true); }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Elements stripe={stripePromise} options={options}>
        <PaymentMethodModal open={paymentMethodModalOpen} handleClose={() => handleClose()} />
      </Elements>
    </>
  )
}