import React, {
  useState,
  useEffect
} from 'react';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import API from '../sevices/api';

import {
  Search,
  SlidersHorizontal,
  Layers,
  Megaphone,
  Sparkles
} from 'lucide-react';

export default function Marketplace() {

  const [products, setProducts] =
    useState([]);

  const [announcements, setAnnouncements] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState('');

  const [selectedCategory, setSelectedCategory] =
    useState('All');

  const [loading, setLoading] =
    useState(true);

  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const [
            productsRes,
            announcementsRes
          ] = await Promise.all([

            API.get('/products'),

            API.get('/admin/announcements')

          ]);

          setProducts(
            productsRes.data
          );

          setAnnouncements(
            announcementsRes.data
          );

        } catch (err) {

          console.log(err);

        } finally {

          setLoading(false);
        }
      };

    fetchData();

  }, []);

  /* =========================
     CATEGORIES
  ========================= */

  const categories = [

    'All',

    ...new Set(
      products.map(
        (p) => p.category
      )
    )
  ];

  /* =========================
     FILTER PRODUCTS
  ========================= */

  const filteredProducts =
    products.filter((p) => {

      const matchesSearch =

        p.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||

        p.description
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =

        selectedCategory === 'All' ||

        p.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (

    <div className="marketplace-page">

      {/* =========================
          ANNOUNCEMENTS
      ========================= */}

      {announcements.length > 0 && (

        <div className="announcement-wrapper">

          <div className="announcement-top">

            <div className="announcement-title-box">

              <Megaphone
                size={22}
              />

              <h2>

                Latest Updates

              </h2>

            </div>

            <div className="live-badge">

              <Sparkles size={14} />

              LIVE

            </div>

          </div>

          <div className="announcement-grid">

            {announcements.map((item) => (

              <motion.div
                key={item._id}
                whileHover={{
                  y: -5
                }}
                className="announcement-card"
              >

                <div className="announcement-glow"></div>

                <div className="announcement-content">

                  {item.content}

                </div>

                <div className="announcement-date">

                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      )}

      {/* =========================
          HEADER
      ========================= */}

      <div className="marketplace-header">

        <div>

          <h1 className="marketplace-title">

            Vivo Marketplace

          </h1>

          <p className="marketplace-subtitle">

            Discover premium products
            from modern digital storefronts
            across the Vivo ecosystem.

          </p>

        </div>

        <div className="search-wrapper">

          <div className="search-box">

            <Search
              size={18}
              className="search-icon"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

          <button className="filter-btn">

            <SlidersHorizontal
              size={16}
            />

            Filters

          </button>

        </div>

      </div>

      {/* =========================
          CATEGORIES
      ========================= */}

      <div className="category-row">

        {categories.map((cat) => (

          <button
            key={cat}
            onClick={() =>
              setSelectedCategory(cat)
            }
            className={
              selectedCategory === cat
                ? 'category-btn active'
                : 'category-btn'
            }
          >

            {cat}

          </button>

        ))}

      </div>

      {/* =========================
          LOADING
      ========================= */}

      {loading ? (

        <div className="products-grid">

          {[...Array(8)].map((_, i) => (

            <div
              key={i}
              className="product-skeleton"
            >

              <div className="skeleton-image"></div>

              <div className="skeleton-line short"></div>

              <div className="skeleton-line"></div>

            </div>

          ))}

        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="empty-state">

          <Layers
            size={45}
            className="empty-icon"
          />

          <h3>

            No Products Found

          </h3>

          <p>

            No marketplace products
            match your search query.

          </p>

        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map((prod) => (

            <motion.div
              key={prod._id}
              whileHover={{
                y: -8
              }}
              transition={{
                type: 'spring',
                stiffness: 250
              }}
              className="product-card"
            >

              {/* IMAGE */}

              <div className="product-image-wrapper">

                <img
                  src={`http://localhost:5000${prod.image}`}
                  alt={prod.name}
                  className="product-image"
                />

              </div>

              {/* CONTENT */}

              <div className="product-content">

                <span className="product-category">

                  {prod.category}

                </span>

                <Link
                  className="product-name"
                >

                  {prod.name}

                </Link>

                <p className="product-description">

                  {prod.description}

                </p>

                <div className="product-footer">

                  <div>

                    <span className="price-label">

                      Price

                    </span>

                    <div className="product-price">

                      {prod.price} ETB

                    </div>

                  </div>

                  <Link
                    to={`/product/${prod._id}`}
                    className="order-btn"
                  >

                    Order Now

                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>
      )}

      {/* =========================
          CSS
      ========================= */}

      <style>{`

        .marketplace-page{
          padding:30px;
          background:#070B14;
          min-height:100vh;
        }

        /* ANNOUNCEMENTS */

        .announcement-wrapper{
          margin-Top:60px;
        }

        .announcement-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
          gap:15px;
          flex-wrap:wrap;
        }

        .announcement-title-box{
          display:flex;
          align-items:center;
          gap:12px;
          color:white;
        }

        .announcement-title-box h2{
          font-size:28px;
          font-weight:700;
        }

        .live-badge{
          background:linear-gradient(
            135deg,
            #8b5cf6,
            #ec4899
          );
          color:white;
          padding:10px 14px;
          border-radius:999px;
          display:flex;
          align-items:center;
          gap:8px;
          font-size:13px;
          font-weight:600;
        }

        .announcement-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(280px,1fr));
          gap:20px;
        }

        .announcement-card{
          position:relative;
          overflow:hidden;
          padding:24px;
          border-radius:28px;
          background:
          rgba(255,255,255,0.04);
          border:
          1px solid rgba(255,255,255,0.06);
          backdrop-filter:blur(10px);
        }

        .announcement-glow{
          position:absolute;
          top:-50px;
          right:-50px;
          width:140px;
          height:140px;
          background:
          rgba(139,92,246,0.2);
          border-radius:50%;
          filter:blur(50px);
        }

        .announcement-content{
          position:relative;
          color:white;
          font-size:16px;
          line-height:1.8;
          font-weight:500;
        }

        .announcement-date{
          margin-top:20px;
          color:#9ca3af;
          font-size:13px;
        }

        /* HEADER */

        .marketplace-header{
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:20px;
          margin-Top:70px;
          flex-wrap:wrap;
        }

        .marketplace-title{
          color:white;
          font-size:40px;
          font-weight:800;
        }

        .marketplace-subtitle{
          color:#9ca3af;
          max-width:650px;
          margin-top:10px;
          line-height:1.7;
        }

        .search-wrapper{
          display:flex;
          gap:12px;
          flex-wrap:wrap;
        }

        .search-box{
          display:flex;
          align-items:center;
          background:#111827;
          padding:14px 18px;
          border-radius:18px;
          min-width:280px;
        }

        .search-box input{
          background:transparent;
          border:none;
          outline:none;
          color:white;
          width:100%;
          margin-left:10px;
        }

        .search-icon{
          color:#9ca3af;
        }

        .filter-btn{
          border:none;
          background:#8b5cf6;
          color:white;
          padding:14px 18px;
          border-radius:18px;
          display:flex;
          align-items:center;
          gap:10px;
          cursor:pointer;
        }

        .category-row{
          display:flex;
          gap:12px;
          margin-bottom:30px;
          flex-wrap:wrap;
        }

        .category-btn{
          border:none;
          padding:12px 18px;
          border-radius:999px;
          background:#111827;
          color:#d1d5db;
          cursor:pointer;
        }

        .category-btn.active{
          background:#8b5cf6;
          color:white;
        }

        .products-grid{
          display:grid;
          grid-template-columns:
          repeat(auto-fit,minmax(280px,1fr));
          gap:24px;
        }

        .product-card{
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.05);
          border-radius:28px;
          overflow:hidden;
        }

        .product-image-wrapper{
          height:260px;
          overflow:hidden;
        }

        .product-image{
          width:100%;
          height:100%;
          object-fit:cover;
        }

        .product-content{
          padding:22px;
        }

        .product-category{
          color:#a78bfa;
          font-size:13px;
        }

        .product-name{
          display:block;
          color:white;
          font-size:22px;
          font-weight:700;
          margin-top:10px;
          text-decoration:none;
        }

        .product-description{
          color:#9ca3af;
          margin-top:12px;
          line-height:1.7;
        }

        .product-footer{
          margin-top:20px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:15px;
        }

        .price-label{
          color:#9ca3af;
          font-size:13px;
        }

        .product-price{
          color:white;
          font-size:24px;
          font-weight:700;
          margin-top:5px;
        }

        .order-btn{
          background:linear-gradient(
            135deg,
            #8b5cf6,
            #ec4899
          );
          color:white;
          padding:12px 18px;
          border-radius:14px;
          text-decoration:none;
          font-weight:600;
          width:40%;
        }

        .empty-state{
          text-align:center;
          padding:80px 20px;
          color:white;
        }

        .empty-icon{
          color:#8b5cf6;
          margin-bottom:20px;
        }

        @media(max-width:768px){

          .marketplace-page{
            padding:18px;
          }

          .marketplace-title{
            font-size:32px;
          }

          .search-box{
            min-width:100%;
          }

          .search-wrapper{
            width:100%;
          }

          .filter-btn{
            width:100%;
            justify-content:center;
          }

          .product-footer{
            flex-direction:column;
            align-items:flex-start;
          }

          .order-btn{
            width:100%;
            text-align:center;
          }

        }

      `}</style>

    </div>
  );
}