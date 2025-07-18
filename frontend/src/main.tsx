import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

console.log("App booted at:", new Date().toISOString());

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Auth0Provider>
    </React.StrictMode>
);