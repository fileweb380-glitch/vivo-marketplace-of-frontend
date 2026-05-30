import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {
  ShieldCheck,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Activity,
  RefreshCw,
  TrendingUp,
  Database,
  Server,
  Globe,
  Trash2,
  Send
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

import API from '../sevices/api';

import DashboardLayout from '../layouts/DashboardLayout';

export default function AdminDashboard() {

  const { user } =
    useContext(AuthContext);

  /* =========================
     SECURITY CHECK
  ========================= */

  if (
    !user ||
    user.role !== 'admin'
  ) {

    return (

      <div className="admin-loading-page">

        <div className="admin-error-box">

          Access Denied.
          Admin Only.

        </div>

      </div>
    );
  }

  /* =========================
     STATES
  ========================= */

  const [metrics, setMetrics] =
    useState(null);

  const [users, setUsers] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState('overview');

  const [announcement, setAnnouncement] =
    useState('');

  /* =========================
     FETCH DATA
  ========================= */

  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);

        const [
          metricsRes,
          usersRes,
          ordersRes
        ] = await Promise.all([

          API.get('/admin/metrics'),

          API.get('/admin/users'),

          API.get('/admin/orders')

        ]);

        setMetrics(metricsRes.data);

        setUsers(usersRes.data);

        setOrders(ordersRes.data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  /* =========================
     DELETE USER
  ========================= */

  const deleteUser =
    async (id) => {

      const confirmDelete =
        window.confirm(
          'Delete this user?'
        );

      if (!confirmDelete) return;

      try {

        await API.delete(
          `/admin/users/${id}`
        );

        fetchDashboardData();

      } catch (err) {

        console.log(err);

        alert('Delete failed');
      }
    };

  /* =========================
     POST ANNOUNCEMENT
  ========================= */

  const postAnnouncement =
    async () => {

      if (!announcement) {

        alert('Write message');

        return;
      }

      try {

        await API.post(
          '/admin/announcement',
          {
            content: announcement
          }
        );

        alert(
          'Announcement Posted'
        );

        setAnnouncement('');

      } catch (err) {

        console.log(err);

        alert('Post failed');
      }
    };

  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="admin-loading-page">

        <div className="admin-loading-box">

          <RefreshCw
            size={18}
            className="spin-icon"
          />

          Loading Admin Dashboard...

        </div>

      </div>
    );
  }

  /* =========================
     SIDEBAR
  ========================= */

  const sidebarElements = (

    <div className="admin-sidebar">

      <div className="sidebar-title">

        ADMIN CONTROLS

      </div>

      <button
        onClick={() =>
          setActiveTab(
            'overview'
          )
        }
        className={
          activeTab ===
          'overview'
            ? 'sidebar-btn active'
            : 'sidebar-btn'
        }
      >

        <Activity size={16} />

        Overview

      </button>

      <button
        onClick={() =>
          setActiveTab(
            'users'
          )
        }
        className={
          activeTab ===
          'users'
            ? 'sidebar-btn active'
            : 'sidebar-btn'
        }
      >

        <Users size={16} />

        Users

      </button>

      <button
        onClick={() =>
          setActiveTab(
            'orders'
          )
        }
        className={
          activeTab ===
          'orders'
            ? 'sidebar-btn active'
            : 'sidebar-btn'
        }
      >

        <ShoppingCart size={16} />

        Orders

      </button>

      <button
        onClick={() =>
          setActiveTab(
            'revenue'
          )
        }
        className={
          activeTab ===
          'revenue'
            ? 'sidebar-btn active'
            : 'sidebar-btn'
        }
      >

        <DollarSign size={16} />

        Revenue

      </button>

      <button
        onClick={() =>
          setActiveTab(
            'announcement'
          )
        }
        className={
          activeTab ===
          'announcement'
            ? 'sidebar-btn active'
            : 'sidebar-btn'
        }
      >

        <Send size={16} />

        Announcement

      </button>

    </div>
  );

  /* =========================
     CARDS
  ========================= */

  const cards = [

    {
      label: 'Total Users',
      value: metrics.totalUsers,
      icon: <Users size={22} />,
      color: 'blue'
    },

    {
      label: 'Products',
      value: metrics.totalProducts,
      icon: <Package size={22} />,
      color: 'purple'
    },

    {
      label: 'Orders',
      value: metrics.totalOrders,
      icon: <ShoppingCart size={22} />,
      color: 'orange'
    },

    {
      label: 'Revenue',
      value: `${metrics.totalRevenue} ETB`,
      icon: <DollarSign size={22} />,
      color: 'green'
    }
  ];

  return (

    <DashboardLayout
      sidebar={sidebarElements}
    >

      <div className="admin-dashboard">

        {/* HEADER */}

        <div className="admin-header">

          <div className="admin-header-icon">

            <ShieldCheck size={28} />

          </div>

          <div>

            <h1>

              Vivo Admin Dashboard

            </h1>

            <p>

              Monitor users,
              products, orders,
              revenue and platform.

            </p>

          </div>

        </div>

        {/* OVERVIEW */}

        {activeTab ===
        'overview' && (

          <>

            <div className="admin-cards-grid">

              {cards.map(
                (
                  card,
                  index
                ) => (

                  <div
                    key={index}
                    className={`admin-card ${card.color}`}
                  >

                    <div className="admin-card-icon">

                      {card.icon}

                    </div>

                    <div>

                      <span>

                        {card.label}

                      </span>

                      <h2>

                        {card.value}

                      </h2>

                    </div>

                  </div>
                )
              )}

            </div>

            <div className="analytics-box">

              <div className="analytics-header">

                <TrendingUp size={22} />

                <h3>

                  Platform Diagnostics

                </h3>

              </div>

              <p>

                Vivo marketplace
                systems running
                successfully.

              </p>

              <div className="analytics-status">

                <div className="pulse-dot"></div>

                All Systems Operational

              </div>

            </div>

          </>
        )}

        {/* USERS */}

        {activeTab ===
        'users' && (

          <div className="table-box">

            <h2>
              All Users
            </h2>

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Role</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {users.map((u) => (

                  <tr key={u._id}>

                    <td>
                      {u.name}
                    </td>

                    <td>
                      {u.email}
                    </td>

                    <td>
                      {u.role}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteUser(
                            u._id
                          )
                        }
                      >

                        <Trash2 size={16} />

                        Delete

                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ORDERS */}

        {activeTab ===
        'orders' && (

          <div className="table-box">

            <h2>
              Orders
            </h2>

            <table>

              <thead>

                <tr>

                  <th>Buyer</th>

                  <th>Product</th>

                  <th>Price</th>

                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {orders.map((o) => (

                  <tr key={o._id}>

                    <td>
                      {o.buyer?.email}
                    </td>

                    <td>
                      {o.product?.name}
                    </td>

                    <td>
                      {o.totalPrice}
                      ETB
                    </td>

                    <td>
                      {o.status}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* REVENUE */}

        {activeTab ===
        'revenue' && (

          <div className="table-box">

            <h2>
              Revenue Details
            </h2>

            <table>

              <thead>

                <tr>

                  <th>User</th>

                  <th>Revenue</th>

                </tr>

              </thead>

              <tbody>

                {orders.map((o) => (

                  <tr key={o._id}>

                    <td>
                      {o.buyer?.email}
                    </td>

                    <td>
                      {o.totalPrice}
                      ETB
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ANNOUNCEMENT */}

        {activeTab ===
        'announcement' && (

          <div className="announcement-box">

            <h2>

              Post Announcement

            </h2>

            <textarea
              placeholder="Write new update..."
              value={announcement}
              onChange={(e) =>
                setAnnouncement(
                  e.target.value
                )
              }
            />

            <button
              onClick={
                postAnnouncement
              }
              className="post-btn"
            >

              <Send size={16} />

              Post Message

            </button>

          </div>
        )}

      </div>

      {/* CSS */}

      <style>{`

        .admin-dashboard{
          display:flex;
          flex-direction:column;
          gap:30px;
        }

        .admin-header{
          display:flex;
          align-items:center;
          gap:18px;
        }

        .admin-header-icon{
          width:70px;
          height:70px;
          border-radius:20px;
          background:rgba(239,68,68,0.1);
          display:flex;
          align-items:center;
          justify-content:center;
          color:#f87171;
        }

        .admin-header h1{
          color:white;
          font-size:32px;
        }

        .admin-header p{
          color:#9ca3af;
        }

        .admin-cards-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(230px,1fr));
          gap:20px;
        }

        .admin-card{
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.05);
          border-radius:24px;
          padding:24px;
          display:flex;
          gap:18px;
          align-items:center;
        }

        .admin-card h2{
          color:white;
          margin-top:6px;
        }

        .admin-card span{
          color:#9ca3af;
          font-size:13px;
        }

        .admin-card-icon{
          width:60px;
          height:60px;
          border-radius:18px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(255,255,255,0.04);
        }

        .blue .admin-card-icon{
          color:#60a5fa;
        }

        .purple .admin-card-icon{
          color:#a855f7;
        }

        .orange .admin-card-icon{
          color:#fb923c;
        }

        .green .admin-card-icon{
          color:#4ade80;
        }

        .table-box{
          background:rgba(255,255,255,0.03);
          padding:25px;
          border-radius:24px;
        }

        .table-box h2{
          color:white;
          margin-bottom:20px;
        }

        table{
          width:100%;
          border-collapse:collapse;
        }

        th, td{
          padding:14px;
          text-align:left;
          border-bottom:1px solid rgba(255,255,255,0.05);
          color:#d1d5db;
        }

        th{
          color:white;
        }

        .delete-btn{
          background:#ef4444;
          color:white;
          border:none;
          padding:10px 14px;
          border-radius:12px;
          cursor:pointer;
          display:flex;
          align-items:center;
          gap:8px;
        }

        .announcement-box{
          background:rgba(255,255,255,0.03);
          padding:25px;
          border-radius:24px;
        }

        .announcement-box h2{
          color:white;
          margin-bottom:20px;
        }

        .announcement-box textarea{
          width:100%;
          min-height:180px;
          background:#111827;
          border:none;
          border-radius:16px;
          padding:18px;
          color:white;
          resize:none;
        }

        .post-btn{
          margin-top:18px;
          background:#8b5cf6;
          color:white;
          border:none;
          padding:14px 18px;
          border-radius:14px;
          display:flex;
          align-items:center;
          gap:10px;
          cursor:pointer;
        }

        .analytics-box{
          background:rgba(255,255,255,0.03);
          padding:28px;
          border-radius:24px;
        }

        .analytics-header{
          display:flex;
          align-items:center;
          gap:10px;
          color:white;
          margin-bottom:16px;
        }

        .analytics-box p{
          color:#cbd5e1;
        }

        .analytics-status{
          margin-top:20px;
          color:#4ade80;
          display:flex;
          align-items:center;
          gap:10px;
        }

        .pulse-dot{
          width:10px;
          height:10px;
          background:#4ade80;
          border-radius:999px;
        }

        .admin-sidebar{
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .sidebar-title{
          color:#ef4444;
          font-size:12px;
          margin-bottom:10px;
        }

        .sidebar-btn{
          width:100%;
          border:none;
          padding:14px;
          border-radius:14px;
          background:transparent;
          color:#9ca3af;
          display:flex;
          align-items:center;
          gap:12px;
          cursor:pointer;
        }

        .sidebar-btn.active{
          background:#dc2626;
          color:white;
        }

        .admin-loading-page{
          min-height:100vh;
          background:#0B0B0F;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .admin-loading-box,
        .admin-error-box{
          background:rgba(255,255,255,0.04);
          padding:20px 30px;
          border-radius:20px;
          color:white;
        }

        .spin-icon{
          animation:spin 1s linear infinite;
        }

        @keyframes spin{
          from{
            transform:rotate(0deg);
          }
          to{
            transform:rotate(360deg);
          }
        }

      `}</style>

    </DashboardLayout>
  );
}