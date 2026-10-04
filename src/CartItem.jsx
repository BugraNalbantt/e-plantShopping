import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 1. Sepetteki tüm ürünlerin genel toplam tutarını hesaplama
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const numericCost = parseFloat(item.cost.substring(1));
      total += numericCost * item.quantity;
    });
    return total;
  };

  // 2. Alışverişe devam et butonu
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // 3. Ödeme butonu bildirimi
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 4. Miktarı artırma
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // 5. Miktarı azaltma (1 ise sepetten kaldır, büyükse 1 azalt)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // 6. Ürünü tamamen sepetten silme
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // 7. Tek bir ürünün ara toplamını hesaplama (Birim Fiyat x Adet)
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.substring(1));
    return numericCost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Subtotal: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={(e) => handleCheckoutShopping(e)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;