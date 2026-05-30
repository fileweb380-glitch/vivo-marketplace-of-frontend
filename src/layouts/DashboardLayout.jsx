import React from 'react';


export default function DashboardLayout({ sidebar, children }) {

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        {sidebar}
      </aside>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">

        <main className="dashboard-content">
          {children}
        </main>

      </div>

    </div>
  );
}