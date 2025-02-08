import SongCard from '/src/components/SongCard/SongCard';
import Loader from '/src/components/Loader/Loader';
import Error from '/src/components/Error/Error';
import Sidebar from '/src/components/Sidebar/Sidebar';
import { LoggedHeader } from "/src/components/LoggedHeader/LoggedHeader";
import { useGetSongByGenreQuery } from '/src/redux/services/shazamCore';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { filterSongsBySearchAndGenre } from '/src/utils/filterSongs';

const Discover = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const { data, isFetching, error } = useGetSongByGenreQuery("POP");

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedBpmRange, setSelectedBpmRange] = useState([60, 200]);
    const [selectedKey, setSelectedKey] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);

    const filteredSongs = filterSongsBySearchAndGenre(data || [], searchTerm, selectedGenres, selectedBpmRange, selectedKey, selectedPriceRange);

    const handleGenreFilter = (genre) => {
        setSelectedGenres(selectedGenres.includes(genre) ? selectedGenres.filter((g) => g !== genre) : [...selectedGenres, genre]);
    };

    const handleKeyFilter = (key) => {
        setSelectedKey(selectedKey.includes(key) ? selectedKey.filter(k => k !== key) : [...selectedKey, key]);
    };

    const uniqueGenres = [...new Set(data?.map(song => song.genre))];

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
                        <div className="filter-section d-flex flex-column align-items-center mb-4">
                            <div className="d-flex flex-column align-items-center mb-3">
                                <label>BPM:</label>
                                <input type="range" min="60" max="200" value={selectedBpmRange[0]} onChange={(e) => setSelectedBpmRange([parseInt(e.target.value), selectedBpmRange[1]])} />
                                <input type="range" min="60" max="200" value={selectedBpmRange[1]} onChange={(e) => setSelectedBpmRange([selectedBpmRange[0], parseInt(e.target.value)])} />
                            </div>
                            <div className="d-flex flex-wrap justify-content-center mb-3">
                                <label>Tonalidad:</label>
                                {["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].map(key => (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyFilter(key)}
                                        className={`key-button ${selectedKey.includes(key) ? "active" : ""}`}
                                        style={{
                                            padding: "5px 10px",
                                            margin: "5px",
                                            border: "none",
                                            borderRadius: "10px",
                                            backgroundColor: selectedKey.includes(key) ? "#FF5733" : "#f0f0f0",
                                            color: selectedKey.includes(key) ? "#fff" : "#000",
                                            cursor: "pointer",
                                            transition: "background-color 0.3s",
                                        }}
                                    >
                                        {key}
                                    </button>
                                ))}
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <label>Precio:</label>
                                <input type="range" min="0" max="100" value={selectedPriceRange[0]} onChange={(e) => setSelectedPriceRange([parseInt(e.target.value), selectedPriceRange[1]])} />
                                <input type="range" min="0" max="100" value={selectedPriceRange[1]} onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)])} />
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-flex-start gap-4">
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
