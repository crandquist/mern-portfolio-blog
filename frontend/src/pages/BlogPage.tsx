import BlogList from '../components/BlogList';

/**
 * BlogPage
 * --------
 * Renders all blog posts at /blog
 */
const BlogPage: React.FC = () => {
    return(
        <main>
            <BlogList />
        </main>
    );
};

export default BlogPage;