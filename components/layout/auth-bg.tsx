import React, { ReactNode } from 'react';

export const AuthBg = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className="hero-section min-h-screen flex items-center justify-center pt-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/images/hero-background.jpg")`,
      }}
    >
      {children}
    </section>
  );
};
