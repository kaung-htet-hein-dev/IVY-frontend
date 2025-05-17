'use client';

import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { server } from '@/utils/mocks/browser';
import { useEffect } from 'react';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   server.listen();
  // }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
