import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { ROLES } from "../../helpers/roles";
import { useHasRole } from '../../hooks/useHasRole';
import { getPatient } from '../../redux/provider/actions';
import EditPersonalInfo from "./Patient/EditPersonalInfo";
import PatientProfilePictureChange from './Patient/PatientProfilePictureChange';

export default function ProviderEditPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isProvider = useHasRole(ROLES.provider);
  const loadingActions = useSelector((state) => state.system.loadingActions);

  useEffect(() => {
    if (isProvider) {
      dispatch(getPatient(id))
        .then((response) => {
        })
        .catch((error) => {
        });
    }
  }, []);

  return (
    <>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {loadingActions.includes("PROVIDER_GET_PATIENT_ACTION") ? <></> :
              <>
                <PatientProfilePictureChange />
                <EditPersonalInfo />
              </>
            }
          </div>
        </div>
      </main>
    </>
  );
}