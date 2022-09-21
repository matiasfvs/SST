import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";
import Signup from "./containers/SiginUp";
import Notes from "./containers/Notes";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Links() {
  return (
    <Routes>
<Route
  path="/login"
  element={
    <UnauthenticatedRoute>
      <Login />
    </UnauthenticatedRoute>
  }
/>
<Route
  path="/signup"
  element={
    <UnauthenticatedRoute>
      <Signup />
    </UnauthenticatedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <AuthenticatedRoute>
      <Settings />
    </AuthenticatedRoute>
  }
/>
<Route
  path="/notes/new"
  element={
    <AuthenticatedRoute>
      <NewNote />
    </AuthenticatedRoute>
  }
/>

<Route
  path="/notes/:id"
  element={
    <AuthenticatedRoute>
      <Notes />
    </AuthenticatedRoute>
  }
/>
    </Routes>
  );
}