import { HeroBg } from '@/components/ui/hero-bg';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <HeroBg>{children}</HeroBg>;
}
