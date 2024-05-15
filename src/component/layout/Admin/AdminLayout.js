import React from "react";
import Head from "next/head";

const AdminLayout = ({ children, title = "Admin Panel" }) => (
  <div>
    <Head>
      <title>{title}</title>
      {/* Add more common meta tags here */}
    </Head>
    <header>
      <h1>Admin Panel</h1>
      {/* Add admin navigation, logo, etc. */}
    </header>
    <main>{children}</main>
    <footer>
      <p>© 2024 Admin Panel</p>
    </footer>
  </div>
);

export default AdminLayout;
