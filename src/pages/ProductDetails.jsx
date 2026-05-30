import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import {
  ArrowLeft,
  ShoppingBag,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Info,
  FileUp,
  Hash
} from 'lucide-react';

import { AuthContext } from '../context/AuthContext';

import API from '../sevices/api';

export default function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showCheckout, setShowCheckout] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState('telebirr');

  const [reference, setReference] =
    useState('');

  const [screenshot, setScreenshot] =
    useState(null);

  const [chatMessage, setChatMessage] =
    useState('');

  const [submittingOrder, setSubmittingOrder] =
    useState(false);

  /* =========================
     LOAD PRODUCT
  ========================= */

  useEffect(() => {

    API.get('/products')

      .then((res) => {

        const item = res.data.find(
          (p) => p._id === id
        );

        setProduct(item);

        setLoading(false);
      })

      .catch(() => {
        setLoading(false);
      });

  }, [id]);

  /* =========================
     ORDER
  ========================= */

 /* =========================
   ORDER
========================= */

const handleInitializeOrder = async (e) => {

  e.preventDefault();

  if (!user) {

    navigate('/get-started');

    return;
  }

  if (!reference || !screenshot) {

    alert(
      'Please upload receipt screenshot and reference.'
    );

    return;
  }

  if (!product) {

    alert('Product not found');

    return;
  }

  setSubmittingOrder(true);

  const formData = new FormData();

  formData.append(
    'product',
    product._id
  );

  formData.append(
    'store',
    product.store?._id || ''
  );

  formData.append(
    'paymentMethod',
    paymentMethod
  );

  formData.append(
    'reference',
    reference
  );

  formData.append(
    'screenshot',
    screenshot
  );

  try {

    const res = await API.post(
      '/orders',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data'
        }
      }
    );

    console.log(res.data);

    alert('Order successfully submitted.');

    navigate('/marketplace');

  } catch (err) {

    console.log(err.response?.data || err);

    alert('Order submission failed.');

  } finally {

    setSubmittingOrder(false);
  }
};

 /* =========================
   MESSAGE
========================= */

const handleInstantMessage = async () => {

  if (!user) {

    navigate('/get-started');

    return;
  }

  if (!chatMessage.trim()) {

    alert('Please write a message.');

    return;
  }

  try {

    console.log({
      product: product._id,
    receiver: product.seller._id || product.seller,
      content: chatMessage
    });

    const res = await API.post(
      '/messages',
      {

        product: product._id,

       receiver: product.seller._id || product.seller,

        content: chatMessage
      }
    );

    console.log(res.data);

    alert('Message sent successfully.');

    setChatMessage('');

  } catch (err) {

    console.log(err.response?.data || err.message);

    alert('Message failed.');
  }
};
  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="product-loading">

        Loading Product...

      </div>
    );
  }

  if (!product) {

    return (

      <div className="product-loading error">

        Product Not Found

      </div>
    );
  }

  return (

    <div className="product-page">

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >

        <ArrowLeft size={15} />

        Back

      </button>

      {/* MAIN GRID */}

      <div className="product-grid">

        {/* IMAGE */}

        <div className="product-image-card">
<img
  src={`https://vivo-marketplace-of-backend.onrender.com${product.image}`}
  alt={product.name}
  className="product-image"
/>

        </div>

        {/* DETAILS */}

        <div className="product-details">

          <div>

            <span className="product-category">

              {product.category}

            </span>

            <h1 className="product-title">

              {product.name}

            </h1>

            <div className="product-id">

              <Hash size={12} />

              UUID: {product._id}

            </div>

          </div>

          {/* PRICE */}

          <div className="product-price">

            {product.price} ETB

          </div>

          {/* DESCRIPTION */}

          <div className="product-section">

            <h4>
              Product Description
            </h4>

            <p>
              {product.description}
            </p>

          </div>

          {/* STORE */}

          <div className="store-box">

            <span>
              Store
            </span>

            <h3>
              {product.store?.name ||
                'Marketplace Store'}
            </h3>

          </div>

          {/* BUY BUTTON */}

          <button
            onClick={() =>
              setShowCheckout(
                !showCheckout
              )
            }
            className="checkout-button"
          >

            <ShoppingBag size={16} />

            Buy Product

          </button>

          {/* CHAT */}

          <div className="chat-box">

            <h4>

              <MessageSquare size={15} />

              Seller Chat

            </h4>

            <div className="chat-row">

              <input
                type="text"
                placeholder="Ask seller something..."
                className="chat-input"
                value={chatMessage}
                onChange={(e) =>
                  setChatMessage(
                    e.target.value
                  )
                }
              />

              <button
                onClick={
                  handleInstantMessage
                }
                className="chat-send"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* CHECKOUT */}

      {showCheckout && (

        <div className="checkout-card">

          <div className="checkout-header">

            <div className="checkout-icon">

              <ShieldCheck size={22} />

            </div>

            <div>

              <h3>
                Secure Checkout
              </h3>

              <p>
                Complete payment and upload
                transaction proof.
              </p>

            </div>

          </div>

          <form
            onSubmit={
              handleInitializeOrder
            }
            className="checkout-grid"
          >

            {/* LEFT */}

            <div>

              <div className="form-group">

                <label>
                  Payment Method
                </label>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className="premium-input"
                  style={{backgroundColor:'rgba(255,255,255,0.03)'}}
                >

                  <option value="telebirr">
                    Telebirr
                  </option>

                  <option value="cbe">
                    CBE
                  </option>

                  <option value="awash">
                    Awash Bank
                  </option>

                  <option value="abyssinia">
                    Abyssinia Bank
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Transaction Reference
                </label>

                <input
                  type="text"
                  placeholder="FT24848XXXX"
                  className="premium-input"
                  value={reference}
                  onChange={(e) =>
                    setReference(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="form-group">

                <label>
                  Upload Screenshot
                </label>

                <div className="upload-box">

                  <input
                    type="file"
                    accept="image/*"
                    className="upload-input"
                    onChange={(e) =>
                      setScreenshot(
                        e.target.files[0]
                      )
                    }
                  />

                  <FileUp size={20} />

                  <span>

                    {screenshot
                      ? screenshot.name
                      : 'Upload receipt screenshot'}

                  </span>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div className="checkout-info">

              <div>

                <h4>

                  <Info size={14} />

                  Payment Notes

                </h4>

                <div className="info-item">

                  <CheckCircle
                    size={13}
                  />

                  Make sure payment
                  amount is correct.

                </div>

                <div className="info-item">

                  <CheckCircle
                    size={13}
                  />

                  Seller verifies payment
                  manually.

                </div>

              </div>

              <button
                type="submit"
                disabled={
                  submittingOrder
                }
                className="checkout-submit"
              >

                {submittingOrder
                  ? 'Submitting...'
                  : 'Submit Order'}

              </button>

            </div>

          </form>

        </div>
      )}

    </div>
  );
}