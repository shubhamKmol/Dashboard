// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Merchants from "./pages/Merchants";
import useMerchants from "./hook/useMerchants"
function App() {
  //Custom Hook to handle CRUD operations
  const { merchants, isLoading, error,addMerchant, updateMerchant } = useMerchants();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Default landing page Dashboard */}
          <Route
            index
            element={
              <Dashboard merchants={merchants} error={error} isLoading={isLoading} />
            }
          />

          {/* on click of merchant tab routing changes to "/merchant" */}
          <Route
            path="merchants"
            element={
              <Merchants
                merchants={merchants}
                error={error}
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
