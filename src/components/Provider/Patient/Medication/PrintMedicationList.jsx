import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./print-medication-list-style.css";

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
              </div>
            </>
          ))}
        </ol>
      </div>
    </>
  );
}

export default function PrintMedicationList() {
  let navigate = useNavigate();
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const periods_of_day = ["morning", "noon", "evening", "bed"];

  useEffect(() => {
    const dateString = format(new Date(), 'yyyyMMdd_');
    const documentTitle = dateString + "medication_list";
    document.title = documentTitle;
    window.print();
  }, []);

  useEffect(() => {
    if (!selectedPatient) navigate("/login")
  }, [selectedPatient]);

  return (
    <>
      <div className="mt-8 mx-20 my-20 flow-root overflow-x-auto">
        <div className="mb-2 flex flex-none">
          <div className="text-sm font-semibold text-gray-900 flex-none mr-4">Name:</div> <div className="text-sm font-medium text-gray-500">{selectedPatient.attributes.user_profile_first_name} {selectedPatient.attributes.user_profile_last_name}</div>
        </div>
        <div className="mb-8 flex flex-none">
          <div className="text-sm font-semibold text-gray-900 flex-none mr-4">Date:</div> <div className="text-sm ml-2 font-medium text-gray-500">{format(new Date(), "M/d/yyyy")}</div>
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden  sm:rounded-lg">
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
            </div>
          </div>
        </div>
      </div>
      <footer class="fixed bottom-0 w-full text-center py-2">
        <p class="text-sm text-gray-600">Make with &#x2764; by {process.env.REACT_APP_PRODUCT_NAME}</p>
      </footer>
    </>
  );
}