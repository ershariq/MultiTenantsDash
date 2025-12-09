import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <>
      <SignedOut>
        <div className="flex justify-center items-center h-screen">
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <MainLayout>
          <Dashboard />
        </MainLayout>
      </SignedIn>
    </>
  );
}
