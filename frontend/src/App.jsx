import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { ProtectedRoute, PublicRoute } from "./components/AuthRoutes"; // Import the wrappers

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* If logged in, you can't go back to Login */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* If NOT logged in, you can't access Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;