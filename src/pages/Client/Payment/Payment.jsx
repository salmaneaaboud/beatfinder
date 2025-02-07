import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Payment.css";
import { faJetFighter } from "@fortawesome/free-solid-svg-icons";
import { AiFillDelete } from "react-icons/ai";

const Payment = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((beat) => beat.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subTotal = cart.reduce((sum, beat) => sum + (beat.price || 0), 0);
  const discount = subTotal * 0.1;
  const tax = subTotal * 0.15;
  const total = subTotal - discount + tax;

  return (
    <div className="payment-container">
      <div className="cart-section">
        <h2>Mi carrito</h2>
        {cart.length === 0 ? (
          <p>No hay beats en el carrito.</p>
        ) : (
          cart.map((beat) => (
            <div className="cart-item" key={beat.id}>
              <img src={beat.cover} alt={beat.title} className="cart-item__cover" />
              <div className="cart-item__details">
                <h3>{beat.title}</h3>
                <p>{beat.user.name}</p>
                <p className="cart-item__price">{(beat.price || 0).toFixed(2)}€</p>
                <button className="btn-remove" onClick={() => handleRemove(beat.id)}>
                  <AiFillDelete fontSize="20px" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="summary-section">
        <h3>Resumen de la compra</h3>
        <p>Detalles de la compra</p>
        <p>Sub Total: {subTotal.toFixed(2)}€</p>
        <p>Descuento (10%): {discount.toFixed(2)}€</p>
        <p>Impuesto (15%): {tax.toFixed(2)}€</p>
        <h2 className="title-price">Total: {total.toFixed(2)}€</h2>
        <button className="btn-pay paypal">PayPal</button>
        <button className="btn-pay card">Tarjeta de débito o crédito</button>
      </div>
    </div>
  );
};

export default Payment;
