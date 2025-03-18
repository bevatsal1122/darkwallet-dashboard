
import React, { createContext, useContext, ReactNode } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

type PrivyContextProps = {
  children: ReactNode;
};

// Privy configuration context
export const PrivyContext = createContext({});

export const usePrivy = () => useContext(PrivyContext);

export const PrivyProviderWrapper: React.FC<PrivyContextProps> = ({ children }) => {
  // Replace this with your actual Privy App ID
  const PRIVY_APP_ID = "clqoxyz123456"; // You'll need to replace this with your real Privy app ID

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#7000FF',
          logo: 'https://your-app-logo.com/logo.png', // Replace with your app's logo
        },
        embeddedWallets: {
          createOnLogin: true, // Auto-create a wallet for users
          noPromptOnSignature: true,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};
