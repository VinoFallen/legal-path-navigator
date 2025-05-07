// NotFound.tsx
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-serif font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/" className="bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
