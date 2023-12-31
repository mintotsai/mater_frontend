import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disableMFA, enableMFA } from "../../redux/user/actions";

export default function TwoFactorEnable() {
  const dispatch = useDispatch();
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const goto2FASetup = () => {
    dispatch(enableMFA(navigate))
      .then((response) => {
        navigate(response.navigateTo);
      }).catch((error) => {

      });
  }

  const disableMFAOnClick = () => {
    dispatch(disableMFA(auth.user.id));
  }

  return (
    <>
      <section aria-labelledby="billing-history-heading" className="mt-5">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Enable 2FA</h3>
              <p className="mt-1 text-sm text-gray-500">
                Secure your account
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="mt-1">
                  {!auth.user.attributes.otp_required_for_login && (
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={goto2FASetup}
                    >
                      Enable MFA
                    </button>
                  )}
                  {auth.user.attributes.otp_required_for_login && (
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={disableMFAOnClick}
                    >
                      Disable MFA
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}