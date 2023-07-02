import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ROLES } from "../../helpers/roles";
import { capitalizeFirst } from "../../helpers/strings.helper";
import { useHasRole } from '../../hooks/useHasRole';
import { deactivateUser, disableMFA, discardUser, getUsers, impersonateUser, lockUser, resetUserPassword } from '../../redux/admin/actions';
import AdminViewEditUserModal from "./AdminViewEditUserModal";

export default function AdminViewUsers() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const adminUser = useSelector((state) => state.adminUser);
  const [adminViewEditUserModalOpen, setAdminViewEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const isAdministrator = useHasRole(ROLES.admin);

  useEffect(() => {
    if (isAdministrator) {
      dispatch(getUsers())
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }, []);

  const handleRefresh = () => {
    if (isAdministrator) {
      dispatch(getUsers())
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }

  const handleClose = () => {
    handleRefresh();
    setAdminViewEditUserModalOpen(false);
  };

  return (
    <>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
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
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Lock</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Deactivate</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Impersonate</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Reset Password</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Disable MFA</span>
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Discard</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {adminUser.adminAllUsers.map((user) => (
                      <tr key={user.attributes.email}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={user.attributes.profile_image_url.includes("active_storage") ? `${process.env.REACT_APP_BACKEND_API_URL}${user.attributes.profile_image_url}` : `${user.attributes.profile_image_url}`} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{user.attributes.user_profile_first_name || ""} {user.attributes.user_profile_last_name || ""}</div>
                              <div className="text-gray-500">{user.attributes.email || ""}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {
                            /* https://stackoverflow.com/questions/40477245/is-it-possible-to-use-if-else-statement-in-react-render-function */
                            (() => {
                              if (user.attributes.locked) {
                                return (
                                  <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                    Locked
                                  </span>
                                )
                              } else if (user.attributes.deactivated) {
                                return (
                                  <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                    Deactivated
                                  </span>
                                )
                              } else if (user.attributes.discarded) {
                                return (
                                  <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                    Discarded
                                  </span>
                                )
                              } else {
                                return (
                                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    Active
                                  </span>
                                )
                              }
                            })()
                          }
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{Object.keys(user.attributes.roles).map(function (roleName, roleIndex) {
                          if (user.attributes.roles[roleName]) return (<p>{capitalizeFirst(roleName)}</p>)
                        })}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedUser(user);
                              setAdminViewEditUserModalOpen(true);
                            }}>
                            Edit<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(lockUser(user.id))
                                .then((response) => {
                                  handleRefresh();
                                })
                                .catch((error) => {
                                });
                            }}>
                            {!user.attributes.locked ? "Lock" : "Unlock"}<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(deactivateUser(user.id))
                                .then((response) => {
                                  handleRefresh();
                                })
                                .catch((error) => {
                                });
                            }}>
                            {!user.attributes.deactivated ? "Deactivate" : "Activate"}<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(impersonateUser(user.id))
                                .then((response) => {
                                  let navigateTo = response.navigateTo;
                                  let roles = response.roles;
                                  if (response.navigateTo == "/home") {
                                    if (roles && ROLES.admin in roles && roles.admin) {
                                      handleRefresh();
                                      navigateTo = "/admin";
                                    } else {
                                      navigateTo = "/home";
                                    }
                                  }
                                  navigate(navigateTo);
                                })
                                .catch((error) => {
                                  console.log(">>>error");
                                  console.log(error);
                                });
                            }}>
                            {!auth.trueUser || auth.user.id == auth.trueUser.id ? "Impersonate" : ""}<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(resetUserPassword(user.id))
                                .then((response) => {
                                })
                                .catch((error) => {
                                  console.log(">>>error");
                                  console.log(error);
                                });
                            }}>
                            Reset Password<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(disableMFA(user.id))
                                .then((response) => {
                                })
                                .catch((error) => {
                                  console.log(">>>error");
                                  console.log(error);
                                });
                            }}>
                            Disable MFA<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
                          </a>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <a href="#" className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.preventDefault();
                              dispatch(discardUser(user.id))
                                .then((response) => {
                                  handleRefresh();
                                })
                                .catch((error) => {
                                  console.log(">>>error");
                                  console.log(error);
                                });
                            }}>
                            {!user.attributes.discarded ? "Discard" : "Undiscard"}<span className="sr-only">, {user.attributes.user_profile_first_name}</span>
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
      <AdminViewEditUserModal open={adminViewEditUserModalOpen} selectedUser={selectedUser} handleClose={() => handleClose()} />
    </>
  )
}
