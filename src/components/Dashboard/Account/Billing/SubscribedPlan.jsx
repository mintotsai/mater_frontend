import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams, Routes, Route } from 'react-router-dom';

import ManagePlan from './ManagePlan';

export default function SubscribedPlan() {
  const dispatch = useDispatch();
  const [showManagePlan, setShowManagePlan] = useState(false);

  const handleClose = () => {
    setShowManagePlan(false);
  };

  if (showManagePlan) {
    // console.log(">>>result=");
    // console.log(result);
    // console.log("stripePriceId=" + stripePriceId);
    return (
      <ManagePlan
        handleClose={() => handleClose()}
      />
    );
  }

  return (
    <>
      <a href="#" className="mt-5 block text-center text-base text-sm font-medium text-indigo-600"
        onClick={(e) => {
          e.preventDefault();
          setShowManagePlan(true);
        }}
      >
        Manage Subscription
      </a>

    </>
  );
}