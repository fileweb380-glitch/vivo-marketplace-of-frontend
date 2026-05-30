
import React, {
  useEffect,
  useState
} from 'react';

import {
  ShoppingBag,
  MessageSquare,
  Wallet,
  Package
} from 'lucide-react';

import API from '../sevices/api';
import DashboardLayout from '../layouts/DashboardLayout';

export default function BuyerDashboard() {

  const [orders, setOrders] =
    useState([]);

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const currentUser =
  JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const fetchBuyerData =
    async () => {

      try {

        const [
          ordersRes,
          messagesRes
        ] = await Promise.all([

          API.get('/orders/buyer'),

          API.get('/messages')
        ]);

        console.log('Buyer Orders:', ordersRes.data);

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
  fetchBuyerData();
}, []);

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

  if (loading) {

    return (

      <DashboardLayout>

        <div className="buyer-loading">
          Loading...
        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="buyer-dashboard-page">

        <div className="buyer-header">

          <h1>
            Buyer Dashboard
          </h1>

        </div>

        <div className="buyer-metrics-grid">

          <div className="buyer-metric-card">

            <ShoppingBag />

            <h3>
              {orders.length}
            </h3>

            <p>
              Orders
            </p>

          </div>

          <div className="buyer-metric-card">

            <MessageSquare />

            <h3>
              {
                Object.keys(
                  groupedMessages
                ).length
              }
            </h3>

            <p>
              Conversations
            </p>

          </div>

          <div className="buyer-metric-card">

            <Wallet />

            <h3>

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

            </h3>

            <p>
              Total Spent
            </p>

          </div>

        </div>

        <div className="buyer-section">

          <h2>
            My Orders
          </h2>

          <div className="buyer-table-wrapper">

            <table className="buyer-orders-table">

              <thead>

                <tr>

                  <th>
                    Product
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((o) => (

                  <tr key={o._id}>

                    <td>
                      {o.product?.name}
                    </td>

                    <td>
                      {o.totalPrice} ETB
                    </td>

                    <td>
                      {o.status}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="buyer-section">

          <h2>
            Conversations
          </h2>

          <div className="buyer-chat-list">

            {Object.values(
              groupedMessages
            ).map(
              (
                conversation,
                index
              ) => (

                <BuyerConversationCard
                  key={index}
                  conversation={
                    conversation
                  }
                  refreshMessages={
                    fetchBuyerData
                  }
                  currentUser={
                    currentUser
                  }
                />
              )
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

function BuyerConversationCard({
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

      if (!reply.trim()) return;

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
              firstMessage.product?._id,
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

    <div className="buyer-chat-card-new">

      <div className="buyer-chat-header-new">

        <h4>
          {firstMessage.product?.name}
        </h4>

      </div>

      <div className="buyer-chat-body-new">

        {sortedConversation.map(
          (msg) => {

            const isBuyer =
              msg.sender?._id ===
              currentUser?._id;

            return (

              <div
                key={msg._id}
                className={`buyer-chat-row-new ${
                  isBuyer
                    ? 'buyer-chat-right-new'
                    : 'buyer-chat-left-new'
                }`}
              >

                <div
                  className={`buyer-chat-bubble-new ${
                    isBuyer
                      ? 'buyer-chat-blue-new'
                      : 'buyer-chat-green-new'
                  }`}
                >

                  <span className="buyer-chat-email-new">

                    {msg.sender?.email}

                  </span>

                  <p className="buyer-chat-text-new">

                    {msg.content}

                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

      <div className="buyer-reply-wrapper-new">

        <textarea
          value={reply}
          onChange={(e) =>
            setReply(
              e.target.value
            )
          }
          placeholder="Write your message..."
          className="buyer-reply-input-new"
        />

        <button
          onClick={sendReply}
          disabled={sending}
          className="buyer-send-btn-new"
        >

          {sending
            ? 'Sending...'
            : 'Reply'}

        </button>

      </div>

    </div>
  );
}
