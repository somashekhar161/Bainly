import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dash" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dash" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;
