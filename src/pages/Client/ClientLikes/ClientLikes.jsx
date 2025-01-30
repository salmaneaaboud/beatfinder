import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetUserLikesQuery } from '/src/redux/services/shazamCore'; // Asegúrate de que esta ruta sea correcta

const ClientLikes = () => {
    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    const { data, isFetching, error } = useGetUserLikesQuery(token); // Usar el hook correctamente

    if (error) return <Error />;

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <LoggedHeader />
                {isFetching ? (
                    <Loader title="Cargando canciones..." />
                ) : (
                    <div className="d-flex flex-column mx-auto" style={{ width: "90%" }}>
                        <div className="d-flex flex-wrap justify-content-around gap-4 ">
                            {data?.map((song, i) => (
                                 
                                <SongCard
                                key={song.beat.key}
                                song={song}
                                data={data}
                                i={i}
                            />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientLikes;
