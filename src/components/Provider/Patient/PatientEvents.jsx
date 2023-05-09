import { format } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { deleteEvent } from "../../../redux/provider/actions";
import Table from "../../Common/Table";
import AddPatientEventModal from "./AddPatientEventModal";
import EditPatientEventModal from "./EditPatientEventModal";

export default function PatientEvents() {
  const dispatch = useDispatch();
  const providerUser = useSelector((state) => state.providerUser);
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const [openModalAddEvent, setOpenModalAddEvent] = useState(false);
  const [openModalEditEvent, setOpenModalEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { id } = useParams();

  const columns = React.useMemo(() => [
    {
      id: "startdatetime",
      accessorKey: "start_date_time",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Start</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.start_date_time ? format(new Date(info.row.original.start_date_time), 'M/d/yyyy h:mm a') : ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      id: "title",
      accessorKey: "title",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.title || ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Description</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.description || ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      id: "edit",
      header: ({ table }) => (
        <div className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></div>
      ),
      cell: (info) => {
        return (
          <a href="#" className="text-indigo-600 hover:text-indigo-900 print:hidden"
            onClick={(e) => {
              e.preventDefault();
              setSelectedEvent(info.row.original);
              setOpenModalEditEvent(true);
            }}>
            Edit
          </a>
        )
      }
    },
    {
      id: "delete",
      header: ({ table }) => (
        <div className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Delete</span></div>
      ),
      cell: (info) => {
        return (
          <a href="#" className="text-red-600 hover:text-red-900 print:hidden"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteEvent(info.row.original.id))
                .then((response) => {
                })
                .catch((error) => {
                  console.log(">>>error");
                  console.log(error);
                });
            }}>
            Delete
          </a>
        )
      }
    }
  ]);

  return (
    <>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Patient Events</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the patient's events.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                setOpenModalAddEvent(true);
              }}
            >
              Add Appointment
            </button>
          </div>
        </div>
        <Table columns={columns} data={selectedPatient?.attributes?.events} />
      </div>
      <AddPatientEventModal open={openModalAddEvent} handleClose={() => setOpenModalAddEvent(false)} />
      <EditPatientEventModal open={openModalEditEvent} selectedEvent={selectedEvent} handleClose={() => setOpenModalEditEvent(false)} />
    </>
  )
}