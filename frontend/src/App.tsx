import { Routes, Route } from "react-router-dom";
import BlogPage from './pages/BlogPage';
import HomePage from './pages/HomePage';

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
    </Routes>
  );
}

export default App;