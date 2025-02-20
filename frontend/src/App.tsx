import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

import Authenticated from "./pages/Authenticated";

import { useEffect } from "react";
import { useUserStore } from "./store";
function App() {
  const addUser = useUserStore((state) => state.addUser);
  const updateLoading = useUserStore((state) => state.updateLoading);
  useEffect(() => {
    updateLoading(true);
    const profile = localStorage.getItem("profile");

    if (profile) {
      const { username } = JSON.parse(profile);
      if (!username) {
        updateLoading(false);
        return;
      }

      addUser(username);
    }
    updateLoading(false);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dash" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route element={<Authenticated />}>
          <Route path="/dash" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/dash" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;
