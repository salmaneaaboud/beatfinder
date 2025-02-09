import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Edit, Shield, CheckCircle, XCircle } from 'lucide-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Badge, Button, Modal } from 'react-bootstrap';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import Loader from '/src/components/Loader/Loader';  
import { BASE_URL } from "./../../../config";
import { useSelector } from 'react-redux';
import BackButton from "/src/components/BackButton/BackButton";
import ReactPaginate from 'react-paginate';

const BeatManagement = () => {
  const navigate = useNavigate();
  const [beats, setBeats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(''); 
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const beatsPerPage = 10;

  const searchTerm = useSelector((state) => state.search.searchTerm) || '';

  const filteredBeats = beats?.filter(
    (beat) =>
      beat?.title?.toLowerCase().includes(searchTerm.toLowerCase()) 
  ) || [];   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(BASE_URL+'/all-beats', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setBeats(data);
      } catch (error) {
        console.error("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdateBeatStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const newStatus = modalAction === 'deactivate' ? 'not_available' : 'available';

      const response = await fetch(BASE_URL+`/beats/${selectedBeat.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBeats(prevBeats =>
          prevBeats.map(beat =>
            beat.id === selectedBeat.id ? { ...beat, status: newStatus } : beat
          )
        );
        setShowModal(false);
      } else {
        console.error(`Error al cambiar el estado del beat a ${newStatus}`);
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  const confirmBeatAction = (beat, action) => {
    setSelectedBeat(beat);
    setModalAction(action);
    setShowModal(true); 
  };

  const indexOfLastBeat = (currentPage + 1) * beatsPerPage;
  const indexOfFirstBeat = indexOfLastBeat - beatsPerPage;
  const currentBeats = filteredBeats.slice(indexOfFirstBeat, indexOfLastBeat);

  const paginate = ({ selected }) => setCurrentPage(selected);

  if (loading) {
    return (
      <>
        <LoggedHeader />
        <Loader title="Cargando beats..." />
      </>
    );
  }

  return (
    <>
      <LoggedHeader />
      <div className="container mt-4">
        <BackButton />
        <h4 className="text-light mb-5">Gestión de Beats</h4>
        <Table bordered hover responsive variant="light" style={{ backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Género</th>
              <th>BPM</th>
              <th>Estado</th>
              <th>Productor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentBeats.map(({ id, title, cover, genre, bpm, status, user }) => (
              <tr key={id} className="align-middle">
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={cover}
                      alt={title}
                      className="rounded-circle me-2"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <span className="fw-bold">{title}</span>
                  </div>
                </td>
                <td>{genre}</td>
                <td>{bpm}</td>
                <td>
                  <Badge bg={status === 'available' ? 'success' : 'danger'}>
                    {status === 'available' ? 'Disponible' : 'No disponible'}
                  </Badge>
                </td>
                <td>{user.name}</td>
                <td>
                  {status === 'available' ? (
                    <Button
                      onClick={() => confirmBeatAction({ id, title }, 'deactivate')}
                      variant="outline-danger"
                      size="sm"
                    >
                      <XCircle />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => confirmBeatAction({ id, title }, 'activate')}
                      variant="outline-success"
                      size="sm"
                    >
                      <CheckCircle />
                    </Button>
                  )}
                  <Button
                    onClick={() => navigate('/manage-beat', { state: { beatId: id } })}
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

        <ReactPaginate
          previousLabel={'← Anterior'}
          nextLabel={'Siguiente →'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredBeats.length / beatsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginate}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'deactivate' ? 'Confirmar Desactivación' : 'Confirmar Activación'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas{' '}
          {modalAction === 'deactivate' ? 'desactivar' : 'activar'} el beat{' '}
          <strong>{selectedBeat?.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={modalAction === 'deactivate' ? 'danger' : 'success'}
            onClick={handleUpdateBeatStatus}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BeatManagement;
