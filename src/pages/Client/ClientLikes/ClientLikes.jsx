import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetUserLikesQuery } from '/src/redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { filterSongsBySearchAndGenre } from '/src/utils/filterSongs'; // Importa la función
import { useState } from 'react';

const ClientLikes = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const token = localStorage.getItem('token');
    const { data, isFetching, error } = useGetUserLikesQuery(token);

    const [selectedGenres, setSelectedGenres] = useState([]); // Estado para géneros seleccionados
    const filteredSongs = filterSongsBySearchAndGenre(data || [], searchTerm, selectedGenres); // Usa la función

    const handleGenreFilter = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };

    const uniqueGenres = [...new Set(data?.map(song => song.genre))]; // Obtiene géneros únicos

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
                        <div className="genre-filters d-flex flex-wrap justify-content-center mb-4">
                            {uniqueGenres.map((genre) => (
                                <button
                                    key={genre}
                                    onClick={() => handleGenreFilter(genre)}
                                    className={`genre-button ${selectedGenres.includes(genre) ? "active" : ""}`}
                                    style={{
                                        padding: "10px 20px",
                                        margin: "5px",
                                        border: "none",
                                        borderRadius: "20px",
                                        backgroundColor: selectedGenres.includes(genre) ? "#8C52FF" : "#f0f0f0",
                                        color: selectedGenres.includes(genre) ? "#fff" : "#000",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s",
                                    }}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                        <div className="d-flex flex-wrap justify-flex-start gap-4 ">
                            {filteredSongs?.length > 0 ? (
                                filteredSongs.map((song, i) => (
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientLikes;