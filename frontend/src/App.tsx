import { Routes, Route } from "react-router-dom";
import BlogPage from './pages/BlogPage';
import HomePage from './pages/HomePage';
import { BlogDetail } from "./pages/BlogDetail";

/** 
 * App
 * ----
 * Defines all client-side routes for the site.
*/
function App() {
  return (
    <Routes>
      <Route path ="/" element={<HomePage />} />
      <Route path ="/blog" element={<BlogPage />} />
      <Route path ="/blog/:id" element={<BlogDetail />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;