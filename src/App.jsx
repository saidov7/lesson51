import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container">
      <header className="header">
        <h1> Lux Store</h1>
        <div className="cart-info">
           {cart.length} items |  ${total.toFixed(2)}
        </div>
      </header>

      <div className="grid">
        {products.map(product => (
          <div className="card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Buy</button>
          </div>
        ))}
      </div>

      <div className="cart-box">
        <h2> Cart Details</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>{item.title} — ${item.price}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
