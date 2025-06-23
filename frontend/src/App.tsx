import type { JSX } from "react";
import { useEffect, useState } from "react";
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
 * Adds admin detection based on the logged-in user's email,
 * enabling role-based rendering in other components like the navbar.
 * Includes both public and protected views, using React Router and Auth0.
*/
function App() {
  const { user, isAuthenticated } = useAuth0();

  /**
   * isAdmin
   * --------
   * Boolean flag for whether the logged-in user is an admin.
   * Determined by checking the user's email against a static admin list.
   */
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const adminEmails = ["cat.randquist@gmail.com"];
      setIsAdmin(adminEmails.includes(user.email));
    }
  }, [isAuthenticated, user]);

  // For development: log admin status
  console.log("Is Admin:", isAdmin);

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