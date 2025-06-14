'use client';

import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { startMockServer } from '@/lib/server/mock-server';
import { GoogleOAuthProvider } from '@react-oauth/google';

if (process.env.NODE_ENV === 'development') {
  // startMockServer();
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId="278770254383-5p4d5k9ovu02rmfbf9irv279vard52vr.apps.googleusercontent.com">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
