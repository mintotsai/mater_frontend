
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { date } from 'yup';
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
      {/* Billing history */}
      <section aria-labelledby="billing-history-heading" className="mt-5">
        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
          <div className="px-4 sm:px-6">
            <h2 id="billing-history-heading" className="text-lg font-medium leading-6 text-gray-900">
              Billing history
            </h2>
          </div>
          <div className="mt-6 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden border-t border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        {/*
                                  `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                */}
                        <th
                          scope="col"
                          className="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
                        >
                          <span className="sr-only">View receipt</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {billingHistory.length > 0 ?
                        billingHistory.data.map((data) => (
                          <tr key={data.id}>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                              <time dateTime={date.date}>{new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "numeric",
                                day: "2-digit",
                                timeZone: "America/Chicago"
                              }).format(data.date * 1000)}</time>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              Invoice for Jasmine
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }).format(data.amount_paid / 100)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                              <a href={data.invoice_pdf} className="text-indigo-600 hover:text-indigo-900">
                                View receipt
                              </a>
                            </td>
                          </tr>
                        ))
                        : <tr><td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">No invoices</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}