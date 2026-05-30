import React from 'react';
import { motion } from 'framer-motion';

import './GlassCard.css';

export default function GlassCard({
  children,
  className = '',
  ...props
}) {

  return (

    <motion.div
      className={`glass-card ${className}`}
      whileHover={{
        y: -6,
        scale: 1.01
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18
      }}
      {...props}
    >

      <div className="glass-overlay"></div>

      <div className="glass-content">

        {children}

      </div>

    </motion.div>

  );
}