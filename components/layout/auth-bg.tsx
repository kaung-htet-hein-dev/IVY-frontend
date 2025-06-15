import React, { ReactNode } from 'react';

export const AuthBg = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className="hero-section min-h-screen flex items-center justify-center pt-16"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1920")',
      }}
    >
      {children}
    </section>
  );
};
