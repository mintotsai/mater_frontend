import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

export default function ProviderViewPatient() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div>
        Edit Patient: {id}
      </div>
    </>
  );
}