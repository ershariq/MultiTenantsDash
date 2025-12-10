import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";

// Pages
import TenantTable from "./pages/TenantTable";
import TenantDetailsPage from "./pages/TenantDetailsPage";
import PlaceDetailsPage from "./pages/PlaceDetailsPage";
import CampaignDetailsPage from "./pages/CampaignDetailsPage"

export default function App() {
  return (
    <>
      <header>
        {/* If user is NOT logged in */}
        <SignedOut>
          <div className="flex justify-center items-center h-screen">
            <SignIn />
          </div>
        </SignedOut>

        {/* If user IS logged in */}
        <SignedIn>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />

                {/* Tenants List */}
                <Route path="/tenants" element={<TenantTable />} />

                {/* Individual Tenant Details */}
                <Route path="/tenant/:id" element={<TenantDetailsPage />} />

                {/* Individual Tenant place Details */}
                <Route path="/tenant/:id/place/:placeId" element={<PlaceDetailsPage />} />

                {/* Individual Tenant place Details */}
                <Route path="/tenant/:id/place/:placeId/campaign/:campaignId" element={<CampaignDetailsPage />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </SignedIn>
      </header>
    </>
  );
}
