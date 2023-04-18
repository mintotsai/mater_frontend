import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Table from "../../Common/Table";
import AddPatientBloodPressureModal from "./AddPatientBloodPressureModal";

export default function PatientBloodPressureTable() {
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const [addPatientBloodPressureModalOpen, setAddPatientBloodPressureModalOpen] = useState(false);

  useEffect(() => {
  }, [selectedPatient]);

  const columns = React.useMemo(() => [
    {
      id: "systolic",
      accessorKey: "measurement.systolic",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Systolic</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.measurement.systolic || ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      id: "diastolic",
      accessorKey: "measurement.diastolic",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Diastolic</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.measurement.diastolic || ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      id: "pulse",
      accessorKey: "measurement.pulse",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Pulse</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.measurement.pulse || ""}</div>
              </div>
            </div>
          </div>
        )
      },
    },
    {
      id: "taken",
      accessorKey: "taken_at",
      header: ({ table }) => (
        <div className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Taken At</div>
      ),
      cell: (info) => {
        return (
          <div className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
            <div className="flex items-center">
              <div className="ml-4">
                <div className="font-medium text-gray-900">{info.row.original.taken_at ? format(new Date(info.row.original.taken_at), 'M/d/yyyy h:mm a') : ""}</div>
              </div>
            </div>
          </div>
        )
      },
    }
  ]);

  const handleClose = () => {
    setAddPatientBloodPressureModalOpen(false);
  };

  return (
    <>
      {selectedPatient?.attributes?.blood_pressure_measurements &&
        (<>
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Blood Pressure Measurements</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the patients blood pressure readings.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    setAddPatientBloodPressureModalOpen(true);
                  }}
                >
                  Add Blood Pressure
                </button>
              </div>
            </div>
            <Table columns={columns} data={selectedPatient?.attributes?.blood_pressure_measurements} />
          </div>
          <AddPatientBloodPressureModal open={addPatientBloodPressureModalOpen} handleClose={() => handleClose()} />
        </>)}
    </>
  );
}