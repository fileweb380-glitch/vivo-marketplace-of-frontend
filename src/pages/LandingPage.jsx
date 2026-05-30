import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  ShieldAlert,
  Smartphone,
  Sparkles,
  CheckCircle2,
  MessageSquareCode,
  Layers3,
  Quote
} from 'lucide-react';

import Footer from '../components/Footer';

export default function LandingPage() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <div className="landing-page">

      {/* BACKGROUND ORBS */}
      <div className="bg-orb orb-one"></div>
      <div className="bg-orb orb-two"></div>

      {/* HERO */}
      <section className="hero-section">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-container"
        >

          <motion.div
            variants={itemVariants}
            className="hero-badge"
          >
            <Sparkles size={12} />
            Transformative Architecture
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="hero-title"
          >
            Build, Sell, and Grow <br />
            with <span className="gradient-text">Vivo</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="hero-text"
          >
            The premium standalone marketplace ecosystem engineered
            for next-generation creators, modern sellers,
            and digital entrepreneurs.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="hero-buttons"
          >

            <Link to="/get-started" className="primary-btn">
              Get Started
              <ArrowRight size={16} />
            </Link>

            <Link to="/marketplace" className="secondary-btn">
              Explore Products
            </Link>

          </motion.div>

        </motion.div>

      </section>

      {/* FEATURES */}
      <section className="features-section">

        <div className="section-header">
          <h2>Engineered Matrix Controls</h2>

          <p>
            Experience modern enterprise performance natively tuned
            for premium marketplace velocity.
          </p>
        </div>

        <div className="features-grid">

          <motion.div
            whileHover={{ y: -8 }}
            className="feature-card"
          >
            <div className="icon-box purple">
              <Zap size={24} />
            </div>

            <h3>Lightning Execution</h3>

            <p>
              Accelerated route systems and dynamic content pipelines
              for premium user performance.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="feature-card"
          >
            <div className="icon-box blue">
              <ShieldAlert size={24} />
            </div>

            <h3>Escrow Automation</h3>

            <p>
              Secure localized payment systems engineered for trust
              and operational stability.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="feature-card"
          >
            <div className="icon-box pink">
              <Smartphone size={24} />
            </div>

            <h3>Mobile First Core</h3>

            <p>
              Carefully optimized layouts for all modern devices
              and premium rendering experiences.
            </p>
          </motion.div>

        </div>

      </section>

      {/* SELLER SECTION */}
      <section className="seller-section">

        <div className="seller-left">

          <span className="section-tag">
            Merchant Ecosystem
          </span>

          <h2>
            Absolute ownership over your commerce framework.
          </h2>

          <p>
            Vivo removes complexity and gives merchants complete
            control over products, payments, analytics,
            and storefront operations.
          </p>

          <div className="benefits-list">

            <div className="benefit-item">
              <CheckCircle2 size={18} />
              Instantly deployed storefront systems
            </div>

            <div className="benefit-item">
              <CheckCircle2 size={18} />
              Comprehensive order management routing
            </div>

            <div className="benefit-item">
              <CheckCircle2 size={18} />
              Direct merchant communication systems
            </div>

          </div>

        </div>

        <div className="seller-right">

          <div className="chart-card">

            <div className="chart-top">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>LIVE_METRICS</p>
            </div>

            <div className="chart-bars">

              {[60, 45, 80, 55, 95, 70, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1
                  }}
                  className="bar"
                ></motion.div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section">

        <div className="section-header">
          <h2>Validated Operator Signal</h2>
        </div>

        <div className="testimonial-grid">

          <div className="testimonial-card">

            <Quote className="quote-icon" size={38} />

            <p>
              Migrating our premium retail store to Vivo increased
              operational efficiency massively while maintaining
              luxury presentation quality.
            </p>

            <span>
              Elena W. — Store Lead
            </span>

          </div>

          <div className="testimonial-card">

            <Quote className="quote-icon" size={38} />

            <p>
              Vivo created the perfect localized payment workflow
              structure for our Ethiopian digital commerce ecosystem.
            </p>

            <span>
              Marcus K. — Systems Architect
            </span>

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <div className="cta-card">

          <h2>
            The Future Vision Pipeline
          </h2>

          <p>
            Join the next generation of merchants building
            independent digital commerce ecosystems.
          </p>

          <Link
            to="/get-started"
            className="primary-btn"
          >
            Initialize Platform
          </Link>

        </div>

      </section>

      <Footer />

    </div>
  );
}