
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getBillingHistory } from "../../../../redux/billing/actions";

export default function BillingHistory() {
  const dispatch = useDispatch();
  const billingHistory = useSelector((state) => state.billing.billingHistory);

  useEffect(() => {
    // We do this because of async callout
    let mounted = true;

    // Put something here...
    dispatch(getBillingHistory());

    return () => (mounted = false);
  }, []);

  return (
    <>
      <div className="py-4">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Billing History</h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="mt-1">
                  <table>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {billingHistory.data.map((data) => (
                        <tr key={data.id}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "numeric",
                              day: "2-digit",
                              timeZone: "America/Chicago"
                            }).format(data.date * 1000)}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            Invoice for Jasmine
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }).format(data.amount_paid / 100)}
                          </td>
                          <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href={data.invoice_pdf} className="text-indigo-600 hover:text-indigo-900">
                              Download Invoice<span className="sr-only"> </span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}