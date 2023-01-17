import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getNotifications } from '../../redux/user/actions';

var options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: true,
  timeZone: 'America/Chicago'
};

export default function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.user.notifications);

  useEffect(() => {
    console.log("useEffect: mount");

    const fetchData = async () => {
      // get the data from the api
      dispatch(getNotifications());

      return () => {
        console.log("useEffect: unmount");
      }
    }

    fetchData();

  }, []);

  return (
    <>
      <main className="flex-1">
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <section aria-labelledby="billing-history-heading" className="mt-5">
            <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
              <div className="px-4 sm:px-6">
                <h2 id="billing-history-heading" className="text-lg font-medium leading-6 text-gray-900">
                  Notifications
                </h2>
              </div>
              <div className="mt-6 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-t border-gray-200">
                      {notifications && notifications.length > 0 ?
                        <table>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {notifications.map((data) => (
                              <tr key={data.id}>
                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                  {data.attributes.type}
                                </td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                  {data.attributes.params.message}
                                </td>
                                <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                  {data.attributes.created_at}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        : <div>No notifications</div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}