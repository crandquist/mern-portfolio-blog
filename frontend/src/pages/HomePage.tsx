import React from 'react';
import LatestPost from '../components/LatestPost';

/**
 * HomePage
 * --------
 * Main landing page for the portfolio, featuring an intro and latest blog post.
 */
const HomePage: React.FC = () => {
    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">Welcome to Portfolio</h1>
            <p className="mt-4 text-gray-600">
                I'm Cat Randquist — a full-stack developer passionate about building
                elegant, functional apps and sharing what I learn along the way.
            </p>

            {/* Blog teaser */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Latest from the Blog</h2>
                <LatestPost />
            </section>
        </main>
    );
};

export default HomePage;