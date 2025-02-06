import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetSongByGenreQuery } from '/src/redux/services/shazamCore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { filterSongsBySearchAndGenre } from '/src/utils/filterSongs'; // Importa la función

const Discover = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { data, isFetching, error } = useGetSongByGenreQuery("POP");

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

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1">
                <LoggedHeader />
                {isFetching ? (
                    <Loader title="Cargando canciones..." />
                ) : (
                    <div className="d-flex flex-column mx-auto" style={{ width: "90%" }}>
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
                            {filteredSongs?.map((song, i) => (
                                <SongCard
                                    key={song.id}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    data={filteredSongs}
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

export default Discover;