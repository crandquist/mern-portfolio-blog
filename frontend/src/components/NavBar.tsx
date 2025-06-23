// frontend/src/components/NavBar.tsx

import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import type { LogoutOptions } from '@auth0/auth0-react';

/**
 * NavBar
 * -------
 * Top-level navigation component that provides:
 * - Navigation links to Home and Blog
 * - Admin-only link to "New Post"
 * - Login/Logout functionality using Auth0
 */
export function NavBar({ isAdmin }: { isAdmin: boolean }) {
    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
        user,
        isLoading,
    } = useAuth0();

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex items-center justify-between">
            {/* Left side: navigation links */}
            <div className="flex items-center gap-6">
                <Link to="/" className="text-lg font-semibold text-gray-700 hover:text-black">
                    Home
                </Link>
                <Link to="/blog" className="text-lg font-semibold text-gray-700 hover:text-black">
                    Blog
                </Link>
                {isAdmin && (
                    <Link
                        to="/admin/new"
                        className="text-lg font-semibold text-gray-700 hover:text-black"
                    >
                        New Post
                    </Link>
                )}
            </div>

            {/* Right side: login/logout controls */}
            <div className="flex items-center gap-4">
                {!isLoading && !isAuthenticated && (
                    <button
                        onClick={() => loginWithRedirect()}
                        className="ps-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                )}

                {isAuthenticated && (
                    <>
                        <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
                        <button
                            onClick={() =>
                                    logout({ returnTo: window.location.origin } as LogoutOptions)
                                }
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                        >
                            Logout
                        </button> 
                    </>
                )}
            </div>
        </nav>
    );
}