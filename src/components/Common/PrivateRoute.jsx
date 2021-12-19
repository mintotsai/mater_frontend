import React from "react";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  // console.log(">>>PrivateRoute");
  // console.log(">>>condition: " + condition);
  if (!condition) {
    return (
      <Navigate
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }
  // return (<Routes>
  //   <Route path={path} element={Component} {...props} />
  // </Routes>);
  // https://jsshowcase.com/question/error-privateroute-is-not-a-route-component-all-component-children-of-routes-must-be-a-route-or-react-fragment
  return <Outlet />
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
  location: PropTypes.object,
};

export default PrivateRoute;
