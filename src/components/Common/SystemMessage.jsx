import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default function SystemMessage() {
  const system = useSelector((state) => state.system);
  const auth = useSelector((state) => state.auth);

  return (
    <>
      {system.message && system.message != '' && system.message.length == 1 && (
        <div className={`rounded-md ${!auth.isLoggedIn || system.messageStatus != "success" ? "bg-red-50" : "bg-green-50"} p-4`}>
          <div className="flex">
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${!auth.isLoggedIn || system.messageStatus != "success" ? "text-red-800" : "text-green-800"}`}>{system.message[0].detail ? system.message[0].detail : system.message[0].title}</h3>
            </div>
          </div>
        </div>
      )}
      {system.message && system.message != '' && system.message.length > 1 && (
        <div className={`rounded-md ${!auth.isLoggedIn || system.messageStatus != "success" ? "bg-red-50" : "bg-green-50"} p-4`}>
          <ul role="list" className="list-disc pl-5 space-y-1">
            <div className="mt-2 text-sm text-red-700">
              {system.message.map(function (name, index) {
                return (
                  <li key={index}>{name.detail ? name.detail : name.title}</li>
                );
              })}
            </div>
          </ul>
        </div>
      )}
    </>
  );
}