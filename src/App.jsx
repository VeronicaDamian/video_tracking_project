import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import PaymentCalculatorPage from "./pages/PaymentCalculatorPage.jsx";
import TimeTrackingPage from "./pages/TimeTrackingPage.jsx";
import PerformancePage from "./pages/PerformancePage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/projects/*" element={<ProjectsPage />} />
        <Route path="/payment-calculator" element={<PaymentCalculatorPage />} />
        <Route path="/time-tracking" element={<TimeTrackingPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/clients/*" element={<ClientsPage />} />
      </Routes>
    </>
  );
}

export default App;
