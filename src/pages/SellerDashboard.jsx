import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {
  LayoutDashboard,
  PlusCircle,
  PackageCheck,
  MessageSquare,
  Wallet,
  RefreshCw,
  BarChart2,
  Layers
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

import API from '../sevices/api';

import DashboardLayout from '../layouts/DashboardLayout';

export default function SellerDashboard() {

  const { user } =
    useContext(AuthContext);

  const [activeTab, setActiveTab] =
    useState('overview');

  const [orders, setOrders] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* PRODUCT FORM */

  const [pName, setPName] =
    useState('');

  const [pPrice, setPPrice] =
    useState('');

  const [pDesc, setPDesc] =
    useState('');

  const [pCat, setPCat] =
    useState('');

  const [pStock, setPStock] =
    useState('');

  const [pImage, setPImage] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

    const currentUser =
  JSON.parse(
   localStorage.getItem('user')
  );
  /* FETCH DATA */

  const fetchDashboardData =
    async () => {

      try {

        setLoading(true);

        const [
          ordersRes,
          messagesRes
        ] = await Promise.all([
          API.get('/orders/seller'),
          API.get('/messages')
        ]);

        setOrders(
          ordersRes.data
        );

        setMessages(
          messagesRes.data
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

useEffect(() => {
  fetchDashboardData();
}, []);
  /* GROUP CONVERSATIONS */

  const groupedMessages =
    messages.reduce(
      (acc, msg) => {

        const users = [
          msg.sender?._id,
          msg.receiver?._id
        ].sort();

        const key =
          `${msg.product?._id}-${users[0]}-${users[1]}`;

        if (!acc[key]) {

          acc[key] = [];
        }

        acc[key].push(msg);

        return acc;

      },
      {}
    );

  /* CREATE PRODUCT */

  const handleCreateProductNode =
    async (e) => {

      e.preventDefault();

      try {

        setUploading(true);

        const fd =
          new FormData();

        fd.append(
          'name',
          pName
        );

        fd.append(
          'price',
          pPrice
        );

        fd.append(
          'description',
          pDesc
        );

        fd.append(
          'category',
          pCat
        );

        fd.append(
          'stock',
          pStock
        );

        fd.append(
          'image',
          pImage
        );

        await API.post(
          '/products',
          fd,
          {
            headers: {
              'Content-Type':
                'multipart/form-data'
            }
          }
        );

        alert(
          'Product uploaded.'
        );

        setPName('');
        setPPrice('');
        setPDesc('');
        setPCat('');
        setPStock('');
        setPImage(null);

        setActiveTab(
          'overview'
        );

        fetchDashboardData();

      } catch (err) {

        console.log(err);

      } finally {

        setUploading(false);
      }
    };

  /* SIDEBAR */

  const sidebarElements = (

    <div className="sidebar-wrapper">

      <span className="sidebar-label">

        Seller Dashboard

      </span>

      <button
        onClick={() =>
          setActiveTab(
            'overview'
          )
        }
        className={`sidebar-btn ${
          activeTab ===
          'overview'
            ? 'active'
            : ''
        }`}
      >

        <LayoutDashboard size={17} />

        Overview

      </button>

      <button
        onClick={() =>
          setActiveTab(
            'upload'
          )
        }
        className={`sidebar-btn ${
          activeTab ===
          'upload'
            ? 'active'
            : ''
        }`}
      >

        <PlusCircle size={17} />

        Add Product

      </button>

      <button
        onClick={() =>
          setActiveTab(
            'messages'
          )
        }
        className={`sidebar-btn ${
          activeTab ===
          'messages'
            ? 'active'
            : ''
        }`}
      >

        <MessageSquare size={17} />

        Messages

      </button>

    </div>
  );

  /* LOADING */

  if (loading) {

    return (

      <DashboardLayout
        sidebar={sidebarElements}
      >

        <div className="dashboard-loading">

          <RefreshCw
            size={18}
            className="spin"
          />

          Loading Dashboard...

        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout
      sidebar={sidebarElements}
    >

      {/* OVERVIEW */}

      {activeTab ===
      'overview' ? (

        <div className="seller-dashboard">

          <div className="dashboard-header">

            <h1>
              Seller Dashboard
            </h1>

            <p>
              Welcome back,
              {' '}
              {user?.name}
            </p>

          </div>

          <div className="metrics-grid">

            <div className="metric-card">

              <div className="metric-icon purple">

                <PackageCheck size={24} />

              </div>

              <div>

                <div className="metric-label">

                  Orders

                </div>

                <div className="metric-value">

                  {orders.length}

                </div>

              </div>

            </div>

            <div className="metric-card">

              <div className="metric-icon green">

                <Wallet size={24} />

              </div>

              <div>

                <div className="metric-label">

                  Revenue

                </div>

                <div className="metric-value">

                  {
                    orders.reduce(
                      (
                        acc,
                        item
                      ) =>
                        acc +
                        (item.totalPrice || 0),
                      0
                    )
                  }

                  ETB

                </div>

              </div>

            </div>

            <div className="metric-card">

              <div className="metric-icon blue">

                <BarChart2 size={24} />

              </div>

              <div>

                <div className="metric-label">

                  Messages

                </div>

                <div className="metric-value">

                  {
                    Object.keys(
                      groupedMessages
                    ).length
                  }

                </div>

              </div>

            </div>

          </div>

        </div>

      ) : activeTab ===
        'upload' ? (

        <div className="upload-card">

          <h2>
            Add Product
          </h2>

          <form
            onSubmit={
              handleCreateProductNode
            }
            className="product-form"
          >

            <input
              type="text"
              placeholder="Product Name"
              className="premium-input"
              value={pName}
              onChange={(e) =>
                setPName(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Price"
              className="premium-input"
              value={pPrice}
              onChange={(e) =>
                setPPrice(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Category"
              className="premium-input"
              value={pCat}
              onChange={(e) =>
                setPCat(
                  e.target.value
                )
              }
            />

            <input
              type="number"
              placeholder="Stock"
              className="premium-input"
              value={pStock}
              onChange={(e) =>
                setPStock(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Description"
              className="premium-input"
              value={pDesc}
              onChange={(e) =>
                setPDesc(
                  e.target.value
                )
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPImage(
                  e.target.files[0]
                )
              }
            />

            <button
              type="submit"
              className="submit-btn"
            >

              {uploading
                ? 'Uploading...'
                : 'Upload Product'}

            </button>

          </form>

        </div>

      ) : (

        <div>

          <div className="dashboard-header">

            <h1>
              Messages
            </h1>

            <p>
              Talk with your customers.
            </p>

          </div>

          {Object.keys(
            groupedMessages
          ).length === 0 ? (

            <div className="empty-state">

              <MessageSquare size={36} />

              <p>
                No messages yet.
              </p>

            </div>

          ) : (

            <div className="seller-chat-list">

              {Object.values(
                groupedMessages
              ).map(
                (
                  conversation,
                  index
                ) => (

                  <SellerConversationCard
                    key={index}
                    conversation={
                      conversation
                    }
                    refreshMessages={
                      fetchDashboardData
                    }
                    currentUser={
                      user
                    }
                  />
                )
              )}

            </div>
          )}

        </div>
      )}

    </DashboardLayout>
  );
}

/* CHAT CARD */

function SellerConversationCard({
  conversation,
  refreshMessages,
  currentUser
}) {

  const [reply, setReply] =
    useState('');

  const [sending, setSending] =
    useState(false);

  const sortedConversation =
    [...conversation].sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );

  const firstMessage =
    sortedConversation[0];

  const sendReply =
    async () => {

      if (!reply.trim()) {

        return;
      }

      try {

        setSending(true);

        const lastMessage =
          sortedConversation[
            sortedConversation.length - 1
          ];

        const receiverId =
          lastMessage.sender?._id ===
          currentUser?._id
            ? lastMessage.receiver?._id
            : lastMessage.sender?._id;

        await API.post(
          '/messages',
          {
            receiver: receiverId,

            product:
              firstMessage.product
                ?._id,

            content: reply
          }
        );

        setReply('');

        refreshMessages();

      } catch (err) {

        console.log(err);

      } finally {

        setSending(false);
      }
    };

  return (

    <div className="seller-chat-card">

      <div className="seller-chat-header">

        <h4>

          {
            firstMessage.product
              ?.name
          }

        </h4>

      </div>

      <div className="seller-chat-body">

        {sortedConversation.map(
          (msg) => {

            const isSeller =
              msg.sender?._id ===
              currentUser?._id;

            return (

              <div
                key={msg._id}
                className={`seller-chat-row ${
                  isSeller
                    ? 'seller-chat-right'
                    : 'seller-chat-left'
                }`}
              >

                <div
                  className={`seller-chat-bubble ${
                    isSeller
                      ? 'seller-chat-green'
                      : 'seller-chat-blue'
                  }`}
                >

                  <span className="seller-chat-email">

                    {
                      msg.sender
                        ?.email
                    }

                  </span>

                  <p className="seller-chat-text">

                    {msg.content}

                  </p>

                  <span className="seller-chat-time">

                    {new Date(
                      msg.createdAt
                    ).toLocaleString()}

                  </span>

                </div>

              </div>
            );
          }
        )}

      </div>

      <div className="seller-reply-box">

        <textarea
          value={reply}
          onChange={(e) =>
            setReply(
              e.target.value
            )
          }
          placeholder="Write your reply..."
          className="seller-reply-input"
        />

        <button
          onClick={sendReply}
          disabled={sending}
          className="seller-reply-btn"
        >

          {sending
            ? 'Sending...'
            : 'Reply'}

        </button>

      </div>

    </div>
  );
}