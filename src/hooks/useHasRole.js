// https://blog.kiprosh.com/architect-react-apps-using-hooks/
import { useSelector } from "react-redux";
// import useCurrentUser from "./useCurrentUser";

export const useHasRole = (roleNames) => {
  const auth = useSelector((state) => state.auth);

  if (!auth || !auth.user || !auth.user.attributes || !auth.user.attributes.roles) return false;

  const userRoles = auth.user.attributes.roles;

  if (!userRoles) {
    return false;
  }

  if (typeof roleNames === "string") {
    return userRoles.hasOwnProperty(roleNames) && userRoles[roleNames];
  } else if (Array.isArray(roleNames)) {
    // return roleNames.some((role) => role === userRoles); // TODO: This is wrong
    throw new Error("Not Implemented")
  } else {
    return false;
  }
};