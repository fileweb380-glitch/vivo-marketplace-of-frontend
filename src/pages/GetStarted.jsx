import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Store,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';


export default function GetStarted() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 'buyer',
      title: 'Buy Products',
      desc: 'Browse products and safely complete payments with secure escrow systems.',
      icon: <ShoppingCart size={28} />
    },
    {
      id: 'seller',
      title: 'Sell Products',
      desc: 'Create your digital store, upload products, and manage your business easily.',
      icon: <Store size={28} />
    },
    {
      id: 'admin',
      title: 'Admin View',
      desc: 'Manage the platform, monitor activity, and control marketplace systems.',
      icon: <ShieldAlert size={28} />
    }
  ];

  const handleNavigate = (id) => {
    if (id === 'admin') {
      navigate('/admin/login');
    } else {
      navigate(`/onboarding/${id}`);
    }
  };

  return (
    <div className="getstarted-page">

      {/* Background Blur */}
      <div className="getstarted-bg"></div>

      {/* Heading */}
      <div className="getstarted-header">
        <h1>Select Your Route</h1>
        <p>
          Choose how you want to use Vivo Marketplace.
        </p>
      </div>

      {/* Cards */}
      <div className="getstarted-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="getstarted-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.5
            }}
            whileHover={{ y: -8 }}
            onClick={() => handleNavigate(card.id)}
          >
            <div className="card-icon">
              {card.icon}
            </div>

            <h2>
              {card.title}
              <ArrowUpRight size={18} />
            </h2>

            <p>{card.desc}</p>

            <button>
              Continue
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}