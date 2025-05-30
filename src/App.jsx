import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <h1 className="title">🛍️ Grid Store</h1>
      <div className="cart-info">
        <p><strong>Items:</strong> {cart.length}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      <div className="products-wrapper">
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Buy</button>
          </div>
        ))}
      </div>

      <div className="cart-box">
        <h2>🛒 Cart</h2>
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.title} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
