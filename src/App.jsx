import './App.css';
import Nav from './components/Nav.jsx';
import Products from './components/Products';
import Cart from './components/Cart';
import arrProducts from './utils/productos.js';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [products, setProducts] = useState(arrProducts || []);

  const toggleCartVisibility = () => {
    setIsCartVisible((prevState) => !prevState);
  };

  const addToCart = (product) => {
    console.log('Adding to cart:', product);

    const productIndex = products.findIndex((p) => p.id === product.id);

    if (productIndex !== -1 && products[productIndex].stock > 0) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].stock--;
      setProducts(updatedProducts);

      const existingProductIndex = cart.findIndex((item) => item.product.id === product.id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity++;
        setCart(updatedCart);
      } else {
        setCart((prevCart) => [...prevCart, { product, quantity: 1 }]);
      }
    }
  };

  const deleteToCart = (productToRemove) => {
    const existingProductIndex = cart.findIndex((item) => item.product.id === productToRemove.id);

    if (existingProductIndex !== -1) {
      const existingProduct = cart[existingProductIndex];

      // Incrementar el stock solo si se elimina completamente del carrito
      const productIndex = products.findIndex((p) => p.id === productToRemove.id);
      if (productIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[productIndex].stock++;
        setProducts(updatedProducts);
      }

      if (existingProduct.quantity > 1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity--;
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter((item) => item.product.id !== productToRemove.id);
        setCart(updatedCart);
      }
    }
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Nav
        onSearchChange={setSearchTerm}
        onCartToggle={toggleCartVisibility}
        totalItemsInCart={totalItemsInCart}
      />
      <Products
        searchTerm={searchTerm}
        addToCart={addToCart}
        deleteToCart={deleteToCart}
        products={products}
      />
      {isCartVisible && (
        <Cart cartItems={cart} deleteToCart={deleteToCart} addToCart={addToCart} />
      )}
    </div>
  );
}

export default App;
