import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
