import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart, clearCart } from "/src/redux/features/cartSlice"; // Acción de Redux para limpiar carrito
import api from "/src/services/api";
import "./Payment.css";
import { toast } from "sonner";
import { LoggedHeader } from "../../../components/LoggedHeader/LoggedHeader";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart); // Obtener carrito desde Redux
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get("/client/balance");
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error al obtener el saldo", error);
    }
  };

  const handleRemoveFromCart = (item) => {
    try {
      dispatch(removeFromCart(item));
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  const subTotal = cart.reduce((sum, beat) => {
    const price =
      beat.price && !isNaN(parseFloat(beat.price)) ? parseFloat(beat.price) : 0;
    return sum + price;
  }, 0);

  const handlePurchase = async () => {
    if (subTotal > balance) {
      toast.error("Saldo insuficiente para completar la compra.");
      return;
    }

    setLoading(true);
    try {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      await api.post("/cart/sync", { cart: localCart });
      const response = await api.post("/cart/checkout");
      toast.success("Compra realizada con éxito");
      dispatch(clearCart());
      navigate(`/purchase-summary/${response.data.order_id}`);
    } catch (error) {
      console.error("Error en la compra", error);
      toast.error("Error al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoggedHeader />
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
                  <p>{beat.user?.name || "Desconocido"}</p>
                  <p><strong>Licencia: </strong>{beat.licenseName || "Básica"}</p>
                  <p className="cart-item__price">
                    {beat.price ? parseFloat(beat.price).toFixed(2) : "0.00"}€
                  </p>
                  <button
                    className="btn-remove"
                    onClick={() => handleRemoveFromCart(beat)}
                  >
                    <AiFillDelete fontSize="20px" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="summary-section">
          <h3>Resumen de la compra</h3>
          <p>
            Saldo disponible:{" "}
            {balance.toLocaleString("es-ES", { minimumFractionDigits: 2 })}€
          </p>
          <p>Sub Total: {subTotal.toFixed(2)}€</p>
          <h2 className="title-price">Total: {subTotal.toFixed(2)}€</h2>
          <button
            className="btn-pay card"
            onClick={handlePurchase}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Comprar"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Payment;
