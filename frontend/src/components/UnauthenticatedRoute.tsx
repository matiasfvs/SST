import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

function querystring(name:any, url = window.location.href) {
    const parsedName = name.replace(/[[]]/g, "\\$&");
    const regex = new RegExp(`[?&]${parsedName}(=([^&#]*)|&|#|$)`, "i");
    const results = regex.exec(url);
  
    if (!results || !results[2]) {
      return false;
    }
  
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  export default function UnauthenticatedRoute(props:any) {
    const { isAuthenticated }:any = useAppContext();
    const { children } = props;
    const redirect = querystring("redirect");
  
    if (isAuthenticated) {
      return <Navigate to={redirect || "/"} />;
    }
  
    return cloneElement(children, props);
  }