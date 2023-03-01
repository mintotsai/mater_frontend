import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getUsers, stopImpersonatingUser } from '../../redux/admin/actions';
import { ROLES } from "../../helpers/roles";

export default function AdminStopImpersonatingBanner() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleRefresh = () => {
    dispatch(getUsers())
      .then((response) => {
      })
      .catch((error) => {
        console.log(">>>error");
        console.log(error);
      });
  }

  return (
    <div className="flex items-center justify-center gap-x-6 bg-indigo-600 py-2.5 px-6 sm:px-3.5 sm:before:flex-none">
      <p className="text-sm leading-6 text-white">
        <a href="#"
          onClick={(e) => {
            e.preventDefault();
            dispatch(stopImpersonatingUser())
              .then((response) => {
                let navigateTo = response.navigateTo;
                let roles = response.roles;
                if (response.navigateTo == "/home") {
                  if (ROLES.admin in roles && roles.admin) {
                    navigateTo = "/admin";
                  } else {
                    navigateTo = "/home";
                  }
                }
                navigate(navigateTo);
                handleRefresh();
              })
              .catch((error) => {
                console.log(">>>error");
                console.log(error);
              });
          }}>
          <strong className="font-semibold">Stop Impersonating</strong>
        </a>
      </p>
    </div>
  )
}