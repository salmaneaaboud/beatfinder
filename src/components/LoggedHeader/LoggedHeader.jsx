import { Nav, Navbar, Container, Form, Dropdown, Badge } from "react-bootstrap";
import { FaSearch, FaRegCommentDots, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { BiMenuAltRight } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import clientAvatar from "/src/assets/avatar_temp.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoggedHeader.css";
import logo from "/src/assets/logo.png";
import { useAuth } from '/src/hooks/useAuth';
import { useContext } from "react";
import AuthContext from "/src/contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/features/cartSlice";

export function LoggedHeader() {
  const auth = useAuth();
  const { user } = useContext(AuthContext);

  // Obtener el carrito desde Redux
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  // Función para eliminar del carrito
  const handleRemoveFromCart = (item) => {
    try {
      dispatch(removeFromCart(item)); // Eliminar del carrito usando Redux
    } catch (error) {
      console.error("Error al eliminar el producto del carrito:", error);
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar w-100">
      <Container fluid className="px-3">
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler border-0">
          <BiMenuAltRight color="white" size={35} />
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 flex-column flex-lg-row">
            <Form className="search-bar-container col-12 col-lg-6 ms-lg-auto mx-0 my-lg-0 my-3">
              <FaSearch className="search-icon" />
              <input
                type="search"
                placeholder="Buscar productor, artista..."
                className="search-bar w-100"
                aria-label="Search"
              />
            </Form>

            <div className="d-flex align-items-center gap-4 ms-auto notifications">
              <div className="notification-item">
                <FaRegCommentDots className="notification-icon" />
                <Badge pill bg="danger" className="notification-badge">
                  5
                </Badge>
              </div>
              <div className="notification-item">
                <FaRegHeart className="notification-icon" />
                <Badge pill bg="danger" className="notification-badge">
                  3
                </Badge>
              </div>

              <Dropdown align="end">
                <Dropdown.Toggle className="client-dropdown" id="cart-dropdown">
                  <FaShoppingCart fontSize="20px" />
                  <Badge pill bg="danger" className="ms-1">
                    {cart.length}
                  </Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu" style={{ minWidth: "300px" }}>
                  {cart.length > 0 ? (
                    <>
                      {cart.map((item) => (
                        <div key={item.id} className="d-flex align-items-center p-2 border-bottom">
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="cart-item-img"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                          <div className="ms-2 flex-grow-1">
                            <p className="mb-1 text-truncate" style={{ maxWidth: "180px" }}>
                              {item.title}
                            </p>
                          </div>
                          <AiFillDelete
                            fontSize="20px"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveFromCart(item)}
                          />
                        </div>
                      ))}
                      <Link to="/cart">
                        <button className="btn btn-primary w-100 mt-2">Ir al carrito</button>
                      </Link>
                    </>
                  ) : (
                    <p className="p-3 text-center">El carrito está vacío</p>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown align="end">
                <Dropdown.Toggle className="client-dropdown" id="dropdown-basic">
                  <div className="d-flex align-items-center gap-2">
                    <span className="client-name">{user?.name || "Usuario"}</span>
                    <img src={user?.avatar || clientAvatar} alt="Avatar" className="avatar" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item as={Link} to={`/edit-user`}>
                    Mi perfil
                  </Dropdown.Item>
                  <Dropdown.Item onClick={auth.logout}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
