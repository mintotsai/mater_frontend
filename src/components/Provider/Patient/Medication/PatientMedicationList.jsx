import { XIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteMedicationList } from '../../../../redux/provider/actions';
import AddPatientMedicationModal from "./AddPatientMedicationModal";

function MedicationColumn({ period_of_day, medications }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex-1 text-left">
        <ol className="list-decimal">
          {medications.map((medication, index) => (
            <>
              <div className="flex items-center justify-between ml-4 mr-4 mt-4">
                <li><p key={index} className="mr-2">{medication.medication.name} {medication.medication.strength && " - " + medication.medication.strength}</p></li>
                <button
                  onClick={() => {
                    dispatch(deleteMedicationList(medication.id));
                  }}
                >
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </>
          ))}
        </ol>
      </div>
    </>
  );
}

export default function MedicationList() {
  const [addPatientMedicationModalOpen, setAddPatientMedicationModalOpen] = useState(false);
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const periods_of_day = ["morning", "noon", "evening", "bed"];

  return (
    <>
      {selectedPatient?.attributes?.medication_lists &&
        (<>
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Medication List</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the patient's medication.
                </p>
              </div>
              <a href="/provider/patients/medication-list/print" target="_blank" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                }}>
                Print
              </a>
              <div className="mt-4 sm:mt-0 sm:ml-3 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {
                    setAddPatientMedicationModalOpen(true);
                  }}
                >
                  Add Medication
                </button>
              </div>
            </div>
            <section aria-labelledby="billing-history-heading" className="mt-5">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="bg-white py-6 px-4 sm:p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-row space-x-4">
                      <div className="flex-1 text-center border-b-2">Morning</div>
                      <div className="flex-1 text-center border-b-2">Noon</div>
                      <div className="flex-1 text-center border-b-2">Evening</div>
                      <div className="flex-1 text-center border-b-2">Bed</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                      {periods_of_day.map(period_of_day => (
                        <MedicationColumn
                          key={period_of_day}
                          period_of_day={period_of_day}
                          medications={
                            selectedPatient.attributes?.medication_lists?.filter(med => med.medication_schedule?.period_of_day?.includes(period_of_day))
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <AddPatientMedicationModal open={addPatientMedicationModalOpen} handleClose={() => setAddPatientMedicationModalOpen(false)} />
          </div>
        </>)}
    </>
  );
}