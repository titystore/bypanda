import { useState, useEffect } from 'react';
import { ImPlus, ImMinus } from "react-icons/im";
import '../styles/cart.css';

const buildWhatsAppMessage = (cartItems) => {
  const message = `¡Hola Tity! Quiero realizar la siguiente orden:\n\n${cartItems.map(item => `${item.product.name} x${item.quantity}`).join('\n')}\n\nTotal: $${getTotalPrice(cartItems)}`;
  return encodeURIComponent(message);
};

const getTotalPrice = (cartItems) => {
  const totalPrice = cartItems.reduce((total, item) => {
    const productPrice = item.product.price * item.quantity;
    return total + productPrice;
  }, 0);
  return totalPrice.toFixed(2);
};

function Cart({ cartItems, addToCart, deleteToCart }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalPrice = getTotalPrice(cartItems);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  return (
    <div className="cart">
      <h2>
        Carrito de Compra{' '}
        <a
          href={`https://api.whatsapp.com/send?phone=51977631700&text=${buildWhatsAppMessage(cartItems)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="enviar-orden">
            Enviar Orden
          </button>
        </a>
      </h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-item">
              <p>
                {item.product.name}
                <span className="bold"></span>
              </p>
              <p className="quantity">x{item.quantity}</p>
              <div className="add-remove">
                <button className="quitar" onClick={() => deleteToCart(item.product)}><ImMinus /></button>
                <button className="agregar" onClick={() => addToCart(item.product)}><ImPlus /></button>
              </div>
            </div>
          ))}
          <p>
            <span className="bold">Total: S/{totalPrice}</span>
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=51977631700&text=${buildWhatsAppMessage(cartItems)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="enviar-orden">
              Enviar Orden
            </button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Cart;
