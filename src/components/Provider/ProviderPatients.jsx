import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../helpers/roles";
import { useHasRole } from '../../hooks/useHasRole';
import { getPatients } from "../../redux/provider/actions";
import Table from "../Common/Table";

export default function AdminViewUsers() {
  const dispatch = useDispatch();
  const isProvider = useHasRole(ROLES.provider);
  const providerUser = useSelector((state) => state.providerUser);

  // const columns = [
  // accessorKey: ["attributes.first_name", "attributes.last_name"],
  // accessorFn: row => `${row.attributes.first_name} ${row.attributes.last_name}`,
  const columns = React.useMemo(() => [
    {
      id: "name",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src={info.row.original.attributes.profile_image_url.includes("active_storage") ? `${process.env.REACT_APP_BACKEND_API_URL}${info.row.original.attributes.profile_image_url}` : `${info.row.original.attributes.profile_image_url}`} alt="" />
              </div>
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.attributes.first_name || ""}</div>
                <div className="text-gray-500">{info.row.original.attributes.email || ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    // {
    //   id: "email",
    //   header: ({ table }) => (
    //     <div className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</div>
    //   ),
    //   cell: (info) => {
    //     return (
    //       <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{info.row.original.attributes.email}</div>
    //     )
    //   }
    // },
    {
      id: "edit",
      header: ({ table }) => (
        <div className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></div>
      ),
      cell: (info) => {
        return (
          <div className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <a href="#" className="text-indigo-600 hover:text-indigo-900"
              onClick={(e) => {
                e.preventDefault();
                console.log("onClick");
              }}>
              Edit<span className="sr-only">, {info.row.original.attributes.first_name}</span>
            </a>
          </div>
        )
      }
    }
  ]);

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
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Patients</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the patients in your account including their name, title, email and role.
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div> */}
      </div>
      <Table columns={columns} data={providerUser.providerAllPatients} />
    </div>
  )
}