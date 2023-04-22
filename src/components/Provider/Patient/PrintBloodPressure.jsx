import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./print-blood-pressure-style.css";

export default function PrintBloodPressure() {
  let navigate = useNavigate();
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);
  const bloodPressureMeasurementsToPrint = useSelector((state) => state.providerUser.bloodPressureMeasurementsToPrint);

  useEffect(() => {
    const dateString = format(new Date(), 'yyyyMMdd_');
    const documentTitle = dateString + "blood_pressure";
    document.title = documentTitle;
    window.print();
  }, []);

  useEffect(() => {
    if (!selectedPatient) navigate("/login")
  }, [selectedPatient]);

  if (!bloodPressureMeasurementsToPrint) return <></>;

  return (
    <>
      <div className="mt-8 mx-20 my-20 flow-root overflow-x-auto">
        <div className="mb-8 flex flex-none">
          <div className="text-sm font-semibold text-gray-900 flex-none mr-4">Name:</div> <div className="text-sm font-medium text-gray-500">{selectedPatient.attributes.user_profile_first_name} {selectedPatient.attributes.user_profile_last_name}</div>
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Take At
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Systolic
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Diastolic
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Pulse
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bloodPressureMeasurementsToPrint.map((bloodPressure) => (
                    <tr key={bloodPressure.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                        {format(new Date(bloodPressure.taken_at), 'M/d/yyyy h:mm a')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bloodPressure.measurement?.diastolic}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bloodPressure.measurement?.systolic}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{bloodPressure.measurement?.pulse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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