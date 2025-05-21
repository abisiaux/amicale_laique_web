import Footer from '@components/Footer';
import Header from '@components/Header';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen min-w-90">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
