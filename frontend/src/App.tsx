import { Routes, Route } from "react-router-dom";
import BlogPage from './pages/BlogPage';
import HomePage from './pages/HomePage';
import { BlogDetail } from "./pages/BlogDetail";
import { BlogEditor } from "./pages/BlogEditor";

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
      <Route path ="/admin/new" element={<BlogEditor />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;