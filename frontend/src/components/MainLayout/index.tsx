/* eslint-disable react/require-default-props */
import { ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />

    </>
  );
}

export default MainLayout;
