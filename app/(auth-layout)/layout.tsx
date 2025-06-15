import { AuthBg } from '@/components/layout/auth-bg';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <AuthBg>{children}</AuthBg>;
}
