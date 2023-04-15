import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPresignedUrl } from "../../../redux/provider/actions";
import ProfilePictureChange from "../../Common/ProfilePictureChange";

export default function PatientProfilePictureChange() {
  const dispatch = useDispatch();
  const selectedPatient = useSelector((state) => state.providerUser.providerSelectedPatient);

  return (
    <>
      {Object.keys(selectedPatient).length !== 0 && (
        <ProfilePictureChange
          selectedUser={selectedPatient}
          callDispatch={(file, payload, navigate) => {
            dispatch(createPresignedUrl(file, payload, navigate));
          }
          } />
      )}
    </>
  );
}