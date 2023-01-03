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
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div className="mt-1">
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}