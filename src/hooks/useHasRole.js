// https://blog.kiprosh.com/architect-react-apps-using-hooks/
import { useSelector, useDispatch } from "react-redux";
// import useCurrentUser from "./useCurrentUser";

export const useHasRole = (roleNames) => {
  const auth = useSelector((state) => state.auth);

  if (!auth || !auth.user || !auth.user.attributes || !auth.user.attributes.role) return false;

  const userRole = auth.user.attributes.role.name;

  if (!userRole) {
    return false;
  }
  if (typeof roleNames === "string") {
    return userRole === roleNames;
  } else if (Array.isArray(roleNames)) {
    return roleNames.some((role) => role === userRole);
  } else {
    return false;
  }
};