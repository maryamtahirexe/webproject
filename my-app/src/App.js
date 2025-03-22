import Payments from "../src/pages/Payment/Payment.js";
import AddPayment from "../src/pages/Payment/AddPayment.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.js";
import "./index.css"; 
import Request from "../src/pages/Request/Request.js";
import AddRequest from "./pages/Request/AddRequest.js";
import Tenant from "./pages/Tenant/Tenant.js";
import AddTenant from "./pages/Tenant/AddTenant.js";
import SignIn from "./pages/Signin/Signin.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import AddProperty from "./pages/Dashboard/AddProperty.js";
import UpdateEmailPage from "./pages/Profile/updateEmail.js";
import ProfilePage from "./pages/Profile/updateProfile.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/add-property" element={<AddProperty />} />
          <Route path="/dashboard/profile/update-password/update-email" element={<UpdateEmailPage />} />
          <Route path="/dashboard/profile/update-password" element={<ProfilePage />} />
          <Route path="/dashboard/payments" element={<Payments />} />
          <Route path="/dashboard/manage-payment" element={<AddPayment />} />
          <Route path="/dashboard/requests" element={<Request />} />
          <Route
            path="/dashboard/manage-request"
            element={<AddRequest label="Status" />}
          />
          <Route path="/dashboard/tenants" element={<Tenant />} />
          <Route path="/dashboard/manage-tenant" element={<AddTenant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
