import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart, clearCart } from "/src/redux/features/cartSlice";
import api from "/src/services/api";
import "./Payment.css";
import { toast } from "sonner";
import { LoggedHeader } from "../../../components/LoggedHeader/LoggedHeader";
import AuthContext from "../../../contexts/AuthContext";
import BackButton from "/src/components/BackButton/BackButton";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const balance = user?.client.balance || 0;
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
      const newBalance = balance - subTotal;
      setUser({ ...user, client: { ...user.client, balance: newBalance } });
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
        <div className="backbutton">
        <BackButton  />
        </div>
      <div className="payment-container container row mx-auto">
        <div className="cart-section container-fluid col-12 col-lg-8">
          <h2 className="mb-4">Mi carrito</h2>
          {cart.length === 0 ? (
            <p>No hay beats en el carrito.</p>
          ) : (
            cart.map((beat) => (
              <div className="custom-cart-item mb-4" key={beat.id}>
                <div className="row g-0 align-items-center">
                  <div className="col-4 col-md-3">
                    <img
                      src={beat.cover}
                      alt={beat.title}
                      className="img-fluid rounded-start custom-cart-item__cover px-2"
                    />
                  </div>
                  <div className="col-8 col-md-9">
                    <div className="custom-card-body p-3 text-dark">
                      <h5 className="custom-card-title">{beat.title}</h5>
                      <p className="custom-card-text mb-1">
                        <small>
                          Productor: {beat.user?.name || "Desconocido"}
                        </small>
                      </p>
                      <p className="custom-card-text mb-2">
                        <small>Licencia: 
                        {beat.licenseName || "Básica"}
                        </small>
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="price fw-bold text-white">
                          {beat.price
                            ? parseFloat(beat.price).toFixed(2)
                            : "0.00"}
                          €
                        </p>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveFromCart(beat)}
                        >
                          <AiFillDelete fontSize="16px" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="summary-section container-fluid col-12 col-lg-4 d-flex flex-column justify-content-center ">
          <h3 className="mb-4">Resumen de la compra</h3>
          <p className="fs-6">
            Saldo disponible:{" "}
            {balance?.toLocaleString("es-ES", { minimumFractionDigits: 2 })}€
          </p>
          <p className="fs-5">Sub Total: {subTotal.toFixed(2)}€</p>
          <h2 className="custom-title-price fs-3 fw-bold">
            Total: {subTotal.toFixed(2)}€
          </h2>
          <button
            className="btn btn-primary w-100"
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
