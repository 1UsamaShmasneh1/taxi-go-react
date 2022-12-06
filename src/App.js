import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import {Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"

import Home from "./components/Home"
import Signup from "./components/Signup"
import Login from "./components/Login"

import UserHome from "./components/UserHome"

import DriverHome from "./components/DriverHome";

import AdminHome from "./components/AdminHome";

import About from "./components/About";

import ContactUs from "./components/ContactUs";

import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";

const ROLES = {
  'User': "User",
  'Driver': "Driver",
  'Admin': "Admin"
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactUs" element={<ContactUs />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
          <Route path="/userHome" element={<UserHome />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={ROLES.Driver} />}>
          <Route path="/driverHome" element={<DriverHome />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
          <Route path="adminHome" element={<AdminHome />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
