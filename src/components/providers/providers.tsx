'use client';

import { ThemeProvider } from './theme-provider';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="elrahama-ui-theme">
      {children}
    </ThemeProvider>
  );
}