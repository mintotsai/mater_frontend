import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Datepicker from "react-tailwindcss-datepicker";
import { deleteHealthMeasurement } from '../../../redux/provider/actions';
import Table from "../../Common/Table";
import AddPatientBloodPressureModal from "./AddPatientBloodPressureModal";
import EditPatientBloodPressureModal from "./EditPatientBloodPressureModal";

export default function PatientBloodPressureTable() {
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const [addPatientBloodPressureModalOpen, setAddPatientBloodPressureModalOpen] = useState(false);
  const [editPatientBloodPressureModalOpen, setEditPatientBloodPressureModalOpen] = useState(false);
  const [selectedBloodPressure, setSelectedBloodPressure] = useState(null);
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: null, endDate: null });
  const [bloodPressureMeasurements, setBloodPressureMeasurements] = useState(selectedPatient?.attributes?.blood_pressure_measurements);

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
    },
    {
      id: "edit",
      header: ({ table }) => (
        <div className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Edit</span></div>
      ),
      cell: (info) => {
        return (
          <a href="#" className="text-indigo-600 hover:text-indigo-900"
            onClick={(e) => {
              e.preventDefault();
              setSelectedBloodPressure(info.row.original);
              setEditPatientBloodPressureModalOpen(true);
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
          <a href="#" className="text-red-600 hover:text-red-900"
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteHealthMeasurement(info.row.original.id))
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
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Datepicker
                  inputClassName="w-full mt-2 rounded-md border-0 py-1.5 w-60 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  toggleClassName="absolute right-0 h-full mt-1 px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                  // useRange={false}
                  // asSingle={true}
                  showShortcuts={true}
                  displayFormat={"M/D/YYYY"}
                  placeholder={"Select your daterange"}
                  maxDate={new Date()}
                  value={dateRangeFilter}
                  onChange={(dateRange) => {
                    // console.log(">>>dateRange=" + JSON.stringify(dateRange));

                    // https://reactjsguru.com/how-to-make-date-range-filter-in-react-js/
                    let filtered = selectedPatient?.attributes?.blood_pressure_measurements;
                    if (dateRange.startDate != null && dateRange.endDate != null) {
                      filtered = selectedPatient?.attributes?.blood_pressure_measurements.filter((bp) => {
                        let takenAt = new Date(bp["taken_at"]);
                        return (takenAt >= new Date(dateRange.startDate) &&
                          takenAt <= new Date(dateRange.endDate));
                      });
                    }

                    setDateRangeFilter(dateRange);
                    setBloodPressureMeasurements(filtered);
                  }}
                />
              </div>
            </div>

            <Table columns={columns} data={bloodPressureMeasurements} />
          </div>
          <AddPatientBloodPressureModal open={addPatientBloodPressureModalOpen} handleClose={() => setAddPatientBloodPressureModalOpen(false)} />
          <EditPatientBloodPressureModal open={editPatientBloodPressureModalOpen} selectedBloodPressure={selectedBloodPressure} handleClose={() => setEditPatientBloodPressureModalOpen(false)} />
        </>)}
    </>
  );
}