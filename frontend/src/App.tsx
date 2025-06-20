import type { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// Page components
import BlogPage from './pages/BlogPage';
import HomePage from './pages/HomePage';
import { BlogDetail } from "./pages/BlogDetail";
import { BlogEditor } from "./pages/BlogEditor";

/**
 * ProtectedRoute
 * --------------
 * A reusable wrapper that protects routes from unauthenticated access.
 * If the user is not authenticated, redirects them to the Auth0 login page.
 */
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // Display loading indicator while Auth0 is initializin
  if (isLoading) return <p>Loading...</p>;

  // Redirect unauthenticated users to Auth0 login
  if (!isAuthenticated) {
    loginWithRedirect();
    return null; // Prevent rendering the protected component
  }

  // Render the protected child route
  return children;
}

/** 
 * App
 * ----
 * Defines all client-side routes for the portfolio/blog site.
 * Includes both public and protected views, using React Router and Auth0.
*/
function App() {
  return (
    <Routes>
      {/* Public homepage */}
      <Route path ="/" element={<HomePage />} />

      {/* Blog index listing */}
      <Route path ="/blog" element={<BlogPage />} />

      {/* Blog detail page (public) */}
      <Route path ="/blog/:id" element={<BlogDetail />} />

      {/* Admin-only blog editor route */}
      <Route 
      path ="/admin/new" 
      element={
        <ProtectedRoute>
          <BlogEditor />
        </ProtectedRoute> 
        }
      />

      {/* Add more routes as needed */}
    
    </Routes>
  );
}

export default App;