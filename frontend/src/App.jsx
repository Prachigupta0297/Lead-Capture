import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";
import LeadForm from "./pages/LeadForm";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/lead-form" element={<LeadForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
