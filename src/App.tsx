import { RoleProvider } from "@/RoleContext.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "@/components/Header.tsx";
import Home from "@/pages/Home.tsx";
import Feedback from "@/pages/Feedback.tsx";
import Harvests from "@/pages/Harvests.tsx";
import BusinessTrip from "@/pages/BusinessTrip.tsx";
import CustomerOrder from "@/pages/CustomerOrder.tsx";
import Product from "@/pages/Product.tsx";
import AgronomistOrder from "@/pages/AgronomistOrder.tsx";
import AgronomistTastings from "@/pages/AgronomistTastings.tsx";
import CustomerReturns from "@/pages/CustomerReturns.tsx";

const App = () => {
  return (
    <Router>
      <RoleProvider>
        <div className={"h-screen bg-gray-950 text-white"}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/harvests" element={<Harvests />} />
            <Route path="/business-trip" element={<BusinessTrip />} />
            <Route path="/agronomistOrder" element={<AgronomistOrder />} />
            <Route path="/customerOrder" element={<CustomerOrder />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/agronomistTastings"
              element={<AgronomistTastings />}
            />
            <Route path="/customerReturns" element={<CustomerReturns />} />
          </Routes>
        </div>
      </RoleProvider>
    </Router>
  );
};

export default App;
