import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../helpers/roles";
import { useHasRole } from '../../hooks/useHasRole';
import { getPatients } from "../../redux/provider/actions";

export default function AdminViewUsers() {
  const dispatch = useDispatch();
  const isProvider = useHasRole(ROLES.provider);
  const providerUser = useSelector((state) => state.providerUser);

  useEffect(() => {
    if (isProvider) {
      dispatch(getPatients())
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }, []);

  return (
    <>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Patients</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the patients in your account including their name, title, email and role.
            </p>
          </div>
          {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div> */}
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {providerUser.providerAllPatients.map((user) => (
                      <tr key={user.attributes.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={user.attributes.profile_image_url.includes("active_storage") ? `${process.env.REACT_APP_BACKEND_API_URL}${user.attributes.profile_image_url}` : `${user.attributes.profile_image_url}`} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{user.attributes.first_name || ""}</div>
                              <div className="text-gray-500">{user.attributes.email || ""}</div>
                            </div>
                          </div>
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
    </>
  )
}