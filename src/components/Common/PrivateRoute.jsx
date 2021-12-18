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
  // console.log(">>>Outlet");
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
