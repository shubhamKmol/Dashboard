// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Merchants from "./pages/Merchants";
// import { useMerchants } from "./hook/useMerchants"; // <- make sure folder name matches
import useMerchants from "./hook/useMerchants"
function App() {
  const { merchants, isLoading, addMerchant, updateMerchant } = useMerchants();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Dashboard: pass merchants + isLoading */}
          <Route
            index
            element={
              <Dashboard merchants={merchants} isLoading={isLoading} />
            }
          />

          {/* Merchants: full CRUD props */}
          <Route
            path="merchants"
            element={
              <Merchants
                merchants={merchants}
                isLoading={isLoading}
                addMerchant={addMerchant}
                updateMerchant={updateMerchant}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
