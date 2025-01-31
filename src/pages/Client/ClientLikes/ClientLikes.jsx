import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";

import { useGetUserLikesQuery } from '/src/redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';

const ClientLikes = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const token = localStorage.getItem('token');

    const { data, isFetching, error } = useGetUserLikesQuery(token);

    if (error) return <Error />;
    console.log(data);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <LoggedHeader />
                {isFetching ? (
                    <Loader title="Cargando canciones..." />
                ) : (
                    <div className="d-flex flex-column mx-auto" style={{ width: "90%" }}>
                    <h1 className='text-center' style={{ color: "white", fontSize: "2rem", marginBottom: "3rem" }}>Canciones que te gustan</h1>
                        <div className="d-flex flex-wrap justify-content-around gap-4 ">
                        {data?.length > 0 ? (
                            data.map((song, i) => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    data={data}
                                    i={i}
                                />
                            ))
                        ) : (
                            <p>No hay canciones disponibles</p>
                        )}

                        </div>  
                    </div>)}
            </div>
        </div>
    );
};

export default ClientLikes;
