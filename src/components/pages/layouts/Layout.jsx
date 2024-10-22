import React from 'react';
import Header from './Header.jsx';
import Footer from "./Footer.jsx"
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
const Layout=({children,title})=> {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
    <Header />
    <Toaster />
    <main className="flex-grow-1 container my-4">
      {children}
    </main>
    <Footer />
  </div>
  );
};

export default Layout
