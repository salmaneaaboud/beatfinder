import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Edit, Shield, UserCheck, UserX, UserPlus } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import Loader from '/src/components/Loader/Loader';
import { BASE_URL } from "./../../../config";
import { useSelector } from 'react-redux';
import { CustomButton } from "/src/components/CustomButton/CustomButton";
import { toast } from 'sonner';
import api from "/src/services/api";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("active");

  const searchTerm = useSelector((state) => state.search.searchTerm) || '';

  const filteredUsers = users?.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateUser = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
        status
      });

      const newUser = response.data;
      setUsers(prevUsers => [...prevUsers, newUser]);
      setShowCreateModal(false);
      toast.success("Usuario creado exitosamente");
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
      setRole("");
      setStatus("active");
    } catch (error) {
      console.error("ERROR:", error);
      let mensajeError = "Error al crear el usuario";

      if (error.response?.data) {
        if (error.response.data.errors) {
          const errores = Object.values(error.response.data.errors).flat();
          mensajeError = errores.join("\n");
        } else if (error.response.data.message || error.response.data.error) {
          mensajeError = error.response.data.message || error.response.data.error;
        }
      } else if (error.request) {
        mensajeError = "No se pudo conectar con el servidor";
      }

      toast.error(mensajeError);
    }
  };

  const handleUpdateUserStatus = async () => {
    try {
      const newStatus = modalAction === 'deactivate' ? 'inactive' : 'active';

      const response = await api.put(`/users/${selectedUser.id}/status`, { 
        status: newStatus 
      });

      if (response.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === selectedUser.id ? { ...user, status: newStatus } : user
          )
        );
        setShowModal(false);
      } else {
        console.error(`Error al cambiar el estado del usuario a ${newStatus}`);
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const confirmUserAction = (user, action) => {
    setSelectedUser(user);
    setModalAction(action);
    setShowModal(true);
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin: <Shield className="text-primary" />,
      producer: <Music className="text-warning" />,
      client: <UserCheck className="text-success" />,
    };
    return icons[role] || null;
  };

  const renderVerificationBadge = (verified) => (
    <Badge bg={verified ? 'success' : 'danger'}>
      {verified ? 'Verificado' : 'No Verificado'}
    </Badge>
  );

  if (loading) {
    return (
      <>
        <LoggedHeader />
        <Loader title="Cargando usuarios..." />
      </>
    );
  }

  return (
    <>
      <LoggedHeader />
      <div className="container mt-4">
        <h4 className="text-light mb-5">Gestión de Usuarios</h4>
        <div className='mb-4'>
          <CustomButton
            type='btn-outline-light'
            value='Crear usuario'
            onClick={() => setShowCreateModal(true)}
          />
        </div>
        <Table bordered hover responsive variant="light" style={{ backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Verificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(({ id, avatar, name, email, role, status, email_verified_at }) => (
              <tr key={id} className="align-middle">
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={avatar}
                      alt={name}
                      className="rounded-circle me-2"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <span className="fw-bold">{name}</span>
                  </div>
                </td>
                <td>{email}</td>
                <td>
                  <div className="d-flex align-items-center">
                    {getRoleIcon(role)}
                    <span className="ms-2 text-capitalize">{role}</span>
                  </div>
                </td>
                <td>
                  <Badge bg={status === 'active' ? 'success' : 'danger'}>
                    {status}
                  </Badge>
                </td>
                <td>
                  {renderVerificationBadge(email_verified_at)}
                </td>
                <td>
                  {status === 'active' ? (
                    <Button
                      onClick={() => confirmUserAction({ id, name }, 'deactivate')}
                      variant="outline-danger"
                      size="sm"
                    >
                      <UserX />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => confirmUserAction({ id, name }, 'activate')}
                      variant="outline-success"
                      size="sm"
                    >
                      <UserPlus />
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate('/manage-profile', { state: { userId: id } })}
                    variant="outline-primary"
                    size="sm"
                    className="ms-2"
                  >
                    <Edit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'deactivate' ? 'Confirmar Desactivación' : 'Confirmar Activación'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas{' '}
          {modalAction === 'deactivate' ? 'desactivar' : 'activar'} al usuario{' '}
          <strong>{selectedUser?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={modalAction === 'deactivate' ? 'danger' : 'success'}
            onClick={handleUpdateUserStatus}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateUser}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol:</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="client">Cliente</option>
                <option value="producer">Productor</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado:</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowCreateModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Crear Usuario
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserManagement;
