import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Music, Edit, Shield, UserCheck, CheckCircle, UserX } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Badge, Button } from 'react-bootstrap';
import './UserManagement.css';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://10.14.4.163:8000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("ERROR:", error);
      }
    };
    fetchData();
  }, []);

  const getRoleIcon = (role) => {
    const icons = {
      admin: <Shield className="text-primary" />,
      producer: <Music className="text-warning" />,
      client: <UserCheck className="text-success" />
    };
    return icons[role] || null;
  };

  const renderVerificationBadge = (verified) => (
    <Badge bg={verified ? 'success' : 'danger'}>
      {verified ? 'Verificado' : 'No Verificado'}
    </Badge>
  );

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://10.14.4.163:8000/api/disable-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'inactive' }), 
      });
  
      if (response.ok) {
        setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, status: 'inactive' } : user)); 
      } else {
        console.error("Error al desactivar el usuario");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const handleActivateUser = async (id) => {
    try {
      const response = await fetch(`http://10.14.4.163:8000/api/enable-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'active' }), 
      });
  
      if (response.ok) {
        setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, status: 'active' } : user)); 
      } else {
        console.error("Error al activar el usuario");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

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
                  <Button
                    onClick={() => handleDeleteUser(id)}
                    variant="outline-danger"
                    size="sm"
                  >
                    <UserX />
                  </Button>
                  <Button
                    onClick={() => handleActivateUser(id)}
                    variant="outline-success"
                    size="sm"
                    className="ms-2"
                  >
                    <CheckCircle />
                  </Button>
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
    </>
  );
};

export default UserManagement;
