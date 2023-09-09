import React from "react";
import { Navigate } from "react-router-dom";

const Authmiddleware = (props) => {
  //localStorage에 authUser가 없으면 login으로 감
  if (!localStorage.getItem("authUser")) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
  return (<React.Fragment>
    {props.children}
  </React.Fragment>);
};

export default Authmiddleware;
