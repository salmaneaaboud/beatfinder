import { useParams } from 'react-router-dom';
import { useGetSongByProducerQuery, useGetProducerDetailsQuery } from '/src/redux/services/shazamCore';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import SongCard from '/src/components/SongCard/SongCard';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from '/src/components/LoggedHeader/LoggedHeader';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ProducerProfile.css';

const ProducerProfile = () => {
    const { id } = useParams();
    const { data: beatsData, isFetching: isFetchingBeats, error: errorBeats } = useGetSongByProducerQuery(id);
    console.log(beatsData);
    const { data: producerData, isFetching: isFetchingProducer, error: errorProducer } = useGetProducerDetailsQuery(id);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    console.log(producerData);
    
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
            } else {
                setItemsPerPage(4);
            }
        };
        
        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    if (isFetchingBeats || isFetchingProducer) return <Loader title="Cargando perfil del productor..." />;
    if (errorBeats || errorProducer) return <Error />;

    const displayedBeats = beatsData?.slice(currentIndex, currentIndex + itemsPerPage) || [];

    const changeSlide = (direction) => {
        setAnimationClass(direction === 'next' ? 'slide-left' : 'slide-right');

        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                direction === 'next'
                    ? Math.min(prevIndex + itemsPerPage, beatsData.length - itemsPerPage)
                    : Math.max(prevIndex - itemsPerPage, 0)
            );
            setAnimationClass('');
        }, 300);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <LoggedHeader />
                <div className="banner text-center text-white mb-4 p-5 position-relative" style={{ backgroundImage: `url(${producerData?.banner || '/default-banner.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px' }}>
                    <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75" style={{ borderRadius: '10px' }}></div>
                    <div className="position-relative">
                        <img src={producerData?.user.avatar || '/default-avatar.png'} alt="Avatar" className="rounded-circle border border-light shadow-lg" width="120" height="120" />
                        <h1 className="fw-bold mt-3">{producerData?.user.name || 'Desconocido'}</h1>
                        <p className="text-white">{producerData?.biografia || 'Sin descripción disponible'}</p>
                    </div>
                </div>
                {beatsData?.length > 0 ? (
                    <div className="container position-relative text-center">
                        <div className="d-flex justify-content-center align-items-center">
                            <button 
                                className="btn btn-dark me-3"
                                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                onClick={() => changeSlide('prev')}
                                disabled={currentIndex === 0}
                            >
                                <FaChevronLeft size={20} />
                            </button>

                            <div className={`song-container d-flex flex-wrap justify-content-center ${animationClass}`} style={{ gap: "10px" }}>
                                {displayedBeats.map((beat, i) => (
                                    <SongCard
                                        key={beat.id}
                                        song={{ ...beat, user: { name: beat.user?.name || 'Desconocido' } }}
                                        isPlaying={isPlaying}
                                        activeSong={activeSong}
                                        i={currentIndex + i}
                                        data={beatsData}
                                    />
                                ))}
                            </div>

                            <button 
                                className="btn btn-dark ms-3"
                                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
                                onClick={() => changeSlide('next')}
                                disabled={currentIndex + itemsPerPage >= beatsData.length}
                            >
                                <FaChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-white">No hay beats disponibles para este productor</p>
                )}
            </div>
        </div>
    );
};

export default ProducerProfile;
