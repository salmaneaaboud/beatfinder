import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Edit, Shield, UserCheck, CheckCircle, UserX, UserPlus } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import './UserManagement.css';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import Loader from '/src/components/Loader/Loader'; 

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); // Action: 'activate' or 'deactivate'
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://10.14.4.163:8000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateUserStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = modalAction === 'deactivate' ? 'inactive' : 'active';

      const response = await fetch(`http://10.14.4.163:8000/api/users/${selectedUser.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === selectedUser.id ? { ...user, status: newStatus } : user
          )
        );
        setShowModal(false); // Close the modal after successful update
      } else {
        console.error(`Error al cambiar el estado del usuario a ${newStatus}`);
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const confirmUserAction = (user, action) => {
    setSelectedUser(user);
    setModalAction(action); // Set action: 'activate' or 'deactivate'
    setShowModal(true); // Open the modal
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
    )
  }

  return (
    <>
      <LoggedHeader />
      <div className="container mt-4">
        <h4 className="text-light mb-5">Gestión de Usuarios</h4>
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
            {users.map(({ id, avatar, name, email, role, status, email_verified_at }) => (
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
    </>
  );
};

export default UserManagement;
