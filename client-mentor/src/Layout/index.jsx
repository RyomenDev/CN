import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-2 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
