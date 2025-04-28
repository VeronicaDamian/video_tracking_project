import {ProjectContext} from './context/ProjectContext.jsx';
import Navbar from './components/Navbar.jsx';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import PaymentCalculatorPage from "./pages/PaymentCalculatorPage.jsx";
import TimeTrackingPage from "./pages/TimeTrackingPage.jsx";
import PerformancePage from "./pages/PerformancePage.jsx";
import ClientsPage from "./pages/ClientsPage.jsx";


function App() {
  return (
    <ProjectContext>
      <div className='app'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/projects/*" element={<ProjectsPage />} />
          <Route path="/payment-calculator" element={<PaymentCalculatorPage />} />
          <Route path="/time-tracking" element={<TimeTrackingPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          <Route path="/clients/*" element={<ClientsPage />} />
        </Routes>
      </div>
    </ProjectContext>
  );
}

export default App;
