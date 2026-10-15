import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/react';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.jsx';

import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}
// Create a client with tanstack

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);