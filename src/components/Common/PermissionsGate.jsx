import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// https://isamatov.com/react-permissions-and-roles/
{/* <PermissionsGate allowedRoles={["Administrator"]} >
  <button
    type="button"
    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    onClick={resetForm}
  >
    Cancel
  </button>
  <button
    type="submit"
    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Save
  </button>
</PermissionsGate> */}
{/* <Route element={<PermissionsGate allowedRoles={["Administrator"]}
  RenderError={() => <p>You shall not pass!</p>}
/>} >
  <Route path="/" element={<Home />}>
    <Route path="home" element={<MainSection />} />
    <Route path="settings/account" element={<Profile />} />
    <Route path="settings/account/2fasetup" element={<TwoFactorSetup />} />
    <Route path="settings/account/checkout" element={<Checkout />} />
    <Route path="notifications" element={<NotificationList />} />
  </Route>
</Route> */}

export default function PermissionsGate({
  // children,
  RenderError = () => <></>,
  pageNotFound = false,
  errorProps = null,
  allowedRoles = [],
  // scopes = []
}) {
  const auth = useSelector((state) => state.auth);
  const userRole = auth.user.attributes.role.name;
  const location = useLocation();

  if (!auth || !auth.user || !auth.user.attributes || !auth.user.attributes.role) return <Navigate to="/login" state={{ from: location }} replace />;

  if (!allowedRoles.includes(userRole)) {
    if (pageNotFound)
      return <Navigate to="/404" replace />;
    if (!errorProps)
      return <RenderError />;
  }

  return <><Outlet /></>
}
